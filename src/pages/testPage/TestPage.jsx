import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import nextIcon from '../../assets/img/test/next.png';
import backIcon from '../../assets/img/test/back.png';
import QuestionCreate from '../../components/QuestionCreate';
import axiosInstance from '../../apis/axiosInstance';

const TestPage = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState('');
    const [timeLeft, setTimeLeft] = useState(15);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                console.log('Fetching user ID...');
                const storedNickname = localStorage.getItem('username');
                if (!storedNickname) {
                    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
                    navigate('/nickname');
                    return;
                }

                const response = await axiosInstance.get(`/api/users/${storedNickname}`);
                const { id } = response.data;
                console.log('User ID fetched:', id);
                setUserId(id);

                // Fetch test data after getting user ID
                fetchTestData(id);
            } catch (error) {
                console.error('Failed to fetch user ID:', error.response || error);
                alert('사용자 정보를 가져오는 데 실패했습니다.');
                navigate('/nickname'); // 로그인 페이지로 이동
            }
        };

        const fetchTestData = async (id) => {
            try {
                console.log('Fetching test data for userId:', id);
                const response = await axiosInstance.get(`/api/random_test/${id}`, {
                    withCredentials: true,
                });
                console.log('테스트 데이터:', response.data);
                setQuestions(response.data.tests);
                setOptions(response.data.options);
                setLoading(false);
            } catch (error) {
                console.error('테스트 데이터를 가져오는 중 에러 발생:', error.response || error);
                alert('테스트 데이터를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchUserId();
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

    const handleAnswerSubmit = async () => {
        try {
            console.log('Submitting answers:', answers);
            // 답안 제출
            await axiosInstance.post('/api/record/answer', {
                answer: answers,
            }, {
                withCredentials: true,
            });

            // 점수 요청
            const scoreResponse = await axiosInstance.post('/api/record/score', {}, {
                withCredentials: true,
            });

            const score = scoreResponse.data;

            if (score === 10) {
                navigate('/score1');
            } else if (score >= 6) {
                navigate('/score2');
            } else {
                navigate('/score3');
            }
        } catch (error) {
            console.error('답안을 제출하거나 점수를 가져오는 데 실패했습니다:', error.response || error);
            alert('답안을 제출하거나 점수를 가져오는 데 실패했습니다.');
        }
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setTimeLeft(15);
        } else {
            handleAnswerSubmit();
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
                        options={options[currentIndex]}
                        onAnswerSelect={(answer) => setAnswers((prev) => prev + answer)}
                    />
                )}
            </div>
        </div>
    );
};

export default TestPage;
