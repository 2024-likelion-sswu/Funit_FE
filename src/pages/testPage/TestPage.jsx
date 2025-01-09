import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import nextIcon from '../../assets/img/test/next.png'
import backIcon from '../../assets/img/test/back.png'
import QuestionCreate from '../../components/QuestionCreate'

const TestPage = () => {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState(''); // 사용자가 선택한 답안
    const [timeLeft, setTimeLeft] = useState(15);
    const [loading, setLoading] = useState(true);
    const [createdBy, setCreatedBy] = useState(null); // 테스트 주인의 userId
    const totalQuestions = questions.length;

    useEffect(() => {
        const fetchUserAndTestData = async () => {
            try {
                // 테스트 주인의 userId 가져오기
                const userResponse = await axios.get('https://dreamcatcherrr.store/api/users/me');
                const userId = userResponse.data.id; // 테스트 주인의 userId
                setCreatedBy(userId);

                // 테스트 데이터 가져오기
                const testResponse = await axios.get(`https://dreamcatcherrr.store/api/random_test/${userId}`);
                setQuestions(testResponse.data.tests);
                setOptions(testResponse.data.options);

                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                alert('데이터를 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };
        fetchUserAndTestData();
    }, []);


      
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
            // 현재 로그인된 사용자의 userId 가져오기 (테스트를 보는 사람)
            const testedByResponse = await axios.get('https://dreamcatcherrr.store/api/users/me');
            const testedBy = testedByResponse.data.id;

            // 답안 제출
            await axios.post('https://dreamcatcherrr.store/api/record/answer', {
                testedBy,
                createdBy, // 테스트 주인의 userId 사용
                answer: answers,
            });

            // 점수 요청
            const scoreResponse = await axios.post('https://dreamcatcherrr.store/api/record/score', {
                testedBy,
                createdBy, // 테스트 주인의 userId 사용
            });

            const score = scoreResponse.data;

            // 점수에 따라 페이지 이동
            if (score = 10) {
                navigate('/score1');
            } else if (10 > score >= 6) {
                navigate('/score2');
            } else {
                navigate('/score3');
            }
        } catch (error) {
            console.error('Failed to submit answer or fetch score:', error);
            alert('답안을 제출하거나 점수를 가져오는 데 실패했습니다.');
        }
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(15); 
        }
        else {
            handleAnswerSubmit(); // 마지막 질문 이후 답안 제출 및 점수 요청
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
                    <img src={backIcon} alt="이전"  onClick={handlePrev} />
                    <p>이전</p>
                </button>
                <button className="arrow-btn"onClick={handleNext}
                disabled={currentIndex === totalQuestions - 1}
                >
                    <p>다음</p>
                    <img src={nextIcon} alt="다음"/>
                </button>
            </div>

        
        <div className="progress-ring-container">
        <p>{currentIndex + 1} / {totalQuestions}</p> 
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
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
                <QuestionCreate 
                    question={questions[currentIndex]}
                    options={options[currentIndex]}
                    onAnswerSelect={(answer) => setAnswers(prev => prev + answer)} // 답안 저장   
                />            
            </div>    
        </div>

    )
}

export default TestPage
