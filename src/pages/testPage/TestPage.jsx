import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import nextIcon from '../../assets/img/test/next.png';
import backIcon from '../../assets/img/test/back.png';
import QuestionCreate from '../../components/QuestionCreate';
import axiosInstance from '../../apis/axiosInstance';

const TestPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(104); // userId 초기값을 104로 설정
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(15);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserIdAndTestData = async () => {
            try {
                const storedNickname = localStorage.getItem('username');
                const userResponse = await axiosInstance.get(`/api/users/${storedNickname}`);
                const { id } = userResponse.data;

                const effectiveUserId = 104 || id;
                console.log('Effective User ID:', effectiveUserId);
                setUserId(effectiveUserId);

                const testResponse = await axiosInstance.get(`/api/random_test/${effectiveUserId}`, {
                    withCredentials: true,
                });
                console.log('테스트 데이터:', testResponse.data);

                setQuestions(testResponse.data.tests || []);
                setOptions(testResponse.data.options || []);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data:', error.response || error);
                alert('데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.');
                navigate('/nickname');
            }
        };

        fetchUserIdAndTestData();
    }, [navigate]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev === 1) {
                    handleNext();
                    return 15;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = async () => {
        try {
            const currentAnswer = answers[currentIndex];
            console.log('Submitting answer for question:', questions[currentIndex]);
            await axiosInstance.post('/api/record/answer', {
                testedBy: userId,
                createdBy: 104,
                answer: currentAnswer,
            }, {
                withCredentials: true,
            });
            console.log('Answer submitted successfully for question:', currentIndex + 1);

            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setTimeLeft(15);
            } else {
                console.log('Fetching score after completing all questions...');
                const scoreResponse = await axiosInstance.post('/api/record/score', {
                    testedBy: userId,
                    createdBy: 104,
                }, {
                    withCredentials: true,
                });

                const score = scoreResponse.data;
                console.log('Final score received:', score);

                if (score === 10) {
                    navigate('/score1');
                } else if (score >= 6) {
                    navigate('/score2');
                } else {
                    navigate('/score3');
                }
            }
        } catch (error) {
            console.error('Failed to submit answer or fetch score:', error.response || error);
            alert('응답 제출 또는 점수 가져오는 데 실패했습니다.');
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            navigate("/urlfriend");
        } else {
            setCurrentIndex(currentIndex - 1);
            setTimeLeft(15);
        }
    };

    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / 15) * circumference;

    useEffect(() => {
        console.log("현재 질문:", questions[currentIndex]);
        console.log("현재 옵션:", options[currentIndex]);
    }, [currentIndex, questions, options]);

    return (
        <div className='container test-container'>
            <div className='wrapper'>
                <button className='arrow-btn'>
                    <img src={backIcon} alt="이전" onClick={handlePrev} />
                    <p>이전</p>
                </button>
                <button className="arrow-btn" onClick={handleNext} disabled={currentIndex === questions.length - 1}>
                    <p>다음</p>
                    <img src={nextIcon} alt="다음" />
                </button>
            </div>
            <div className="progress-ring-container">
                <p>{currentIndex + 1} / {questions.length}</p>
                <svg width="116.24" height="116.24">
                    <circle
                        cx="58.12"
                        cy="58.12"
                        r={radius}
                        stroke="url(#gradient-bg)"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="58.12"
                        cy="58.12"
                        r={radius}
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
                            <stop offset="0%" stopColor="#FF7F71" />
                            <stop offset="100%" stopColor="#FFAAAA" />
                        </linearGradient>
                        <radialGradient id="gradient-bg" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FF7F71" />
                            <stop offset="100%" stopColor="#FCE4E4" />
                        </radialGradient>
                    </defs>
                </svg>
                <p className="time-left">{timeLeft}초</p>
            </div>
            <div className='question-container'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <QuestionCreate
                        question={questions[currentIndex]} 
                        options={options[currentIndex] || []} 
                        onAnswerSelect={(answer) => setAnswers((prev) => [...prev, answer])}
                    />
                )}
            </div>
        </div>
    );
};

export default TestPage;
