import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import nextIcon from '../../assets/img/test/next.png';
import backIcon from '../../assets/img/test/back.png';
import QuestionCreate from '../../components/QuestionCreate';
import axiosInstance from '../../apis/axiosInstance';

const TestPage = () => {
    const navigate = useNavigate();
    const { userNickname } = useParams(); // URL에서 userId 가져오기
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [timeLeft, setTimeLeft] = useState(15);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchNickname = async () => {
            try {
                console.log(`Fetching nickname for userId: ${userNickname}`);
                
                // userId를 사용해 닉네임 가져오기
                const response = await axiosInstance.get(`/api/users/${userNickname}`, {
                    withCredentials: true,
                });

                setUserId(response.data.id); // 닉네임 상태 업데이트
                console.log('response.data.id:', response.data.id);
            } catch (error) {
                console.error('Error fetching nickname:', error.response || error);
                alert('사용자를 찾을 수 없습니다. 로그인 페이지로 이동합니다.');
                navigate('/nickname'); // 에러 발생 시 /nickname으로 리다이렉트
            }
        };

        fetchNickname();
    }, [userNickname, navigate]);

    useEffect(() => {
        if (!userId) return;

        const fetchTestData = async () => {
            try {
                console.log(`Fetching test data for userId: ${userId}`);

                const testResponse = await axiosInstance.get(`/api/random_test/${userId}`, {
                    withCredentials: true,
                });
                console.log('테스트 데이터:', testResponse.data);

                // 질문과 옵션에서 최대 10개만 가져오기
                const fetchedQuestions = testResponse.data.tests.slice(0, 10);
                const fetchedOptions = testResponse.data.options.slice(0, 10);

                setQuestions(fetchedQuestions);
                setOptions(fetchedOptions);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch test data:', error.response || error);
                alert('데이터를 가져오는 데 실패했습니다. 다시 시도해주세요.');
                navigate('/nickname'); 
            }
        };

        fetchTestData();
    }, [navigate, userId]);

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

    const handleAnswerSubmit = async (selectedAnswer) => {
        try {
            // 현재 질문에 대한 답안 제출
            const answerPayload = {
                testedBy: userId,
                createdBy: userId, 
                answer: selectedAnswer,
            };
            console.log('Submitting answer:', answerPayload);

            await axiosInstance.post('/api/record/answer', answerPayload, {
                withCredentials: true,
            });

            console.log('Answer submitted successfully.');
        } catch (error) {
            console.error('답안을 제출하는 데 실패했습니다:', error.response || error);
            alert('답안을 제출하는 데 실패했습니다.');
        }
    };

    const handleNext = async () => {
        const currentAnswer = answers[currentIndex];
        if (currentAnswer) {
            await handleAnswerSubmit(currentAnswer);
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setTimeLeft(15);
        } else {
            // 마지막 질문인 경우 점수를 요청
            handleScoreRequest();
        }
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            navigate(`/urlfriend/${userId}`);
        } else {
            setCurrentIndex(currentIndex - 1);
            setTimeLeft(15);
        }
    };

    const handleScoreRequest = async () => {
        try {
            // 점수 요청
            const scorePayload = {
                testedBy: userId,
                createdBy: userId, 
            };
            console.log('Requesting score:', scorePayload);

            const scoreResponse = await axiosInstance.post('/api/record/score', scorePayload, {
                withCredentials: true,
            });

            const score = scoreResponse.data;

            console.log('Score received:', score);

            if (score === 10) {
                navigate('/score1', { state: { score } });
            } else if (score >= 6) {
                navigate('/score2', { state: { score } });
            } else {
                navigate('/score3', { state: { score } });
            }
        } catch (error) {
            console.error('점수를 요청하는 데 실패했습니다:', error.response || error);
            alert('점수를 요청하는 데 실패했습니다.');
        }
    };

    const handleAnswerSelect = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentIndex] = answer;
        setAnswers(updatedAnswers);
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
                <button className="arrow-btn" onClick={handleNext}>
                    <p>{currentIndex === questions.length - 1 ? "제출" : "다음"}</p>
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
                        option1={options[currentIndex]?.[0] || ''} 
                        option2={options[currentIndex]?.[1] || ''} 
                        option3={options[currentIndex]?.[2] || ''} 
                        option4={options[currentIndex]?.[3] || ''} 
                        onAnswerSelect={handleAnswerSelect}
                        userNickname={userNickname}
                    />
                )}
            </div>
        </div>
    );
};

export default TestPage;
