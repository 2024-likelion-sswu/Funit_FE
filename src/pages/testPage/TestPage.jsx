import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import nextIcon from '../../assets/img/test/next.png'
import backIcon from '../../assets/img/test/back.png'
import QuestionCreate from '../../components/QuestionCreate'

const TestPage = () => {
    const navigate = useNavigate();

    // 예시 데이터
    const QuestionData = [
        {
            question: "가장 좋아하는 계절은?",
            option1: "봄",
            option2: "여름",
            option3: "가을",
            option4: "겨울"
        },
        {
            question: "가장 좋아하는 음식은?",
            option1: "치킨",
            option2: "피자",
            option3: "초밥",
            option4: "떡볶이"
        },
        {
            question: "가장 좋아하는 나라는?",
            option1: "한국",
            option2: "미국",
            option3: "중국",
            option4: "일본"
        },
        {
            question: "가장 좋아하는 디저트는?",
            option1: "아이스크림",
            option2: "초콜릿",
            option3: "마카롱",
            option4: "케이크"
        },
        {
            question: "가장 좋아하던 과목은?",
            option1: "국어",
            option2: "영어",
            option3: "수학",
            option4: "과학"
        },
        {
            question: "가장 큰 장점은?",
            option1: "유머감각",
            option2: "배려심",
            option3: "결단력",
            option4: "추진력"
        },
        {
            question: "가장 좋아하는 동물은?",
            option1: "강아지",
            option2: "고양이",
            option3: "햄스터",
            option4: "토끼"
        },
        {
            question: "갖고싶은 초능력은?",
            option1: "투명인간",
            option2: "순간이동",
            option3: "관심법",
            option4: "공중부양"
        },
        {
            question: "자주 쓰는 유행어는?",
            option1: "ㄹㅇㅋㅋ",
            option2: "어쩔티비",
            option3: "느좋",
            option4: "트민녀"
        },
        {
            question: "영화 속 주인공이라면?",
            option1: "해리포터",
            option2: "아이언맨",
            option3: "조커",
            option4: "엘사"
        }
    ]

    const [currentIndex, setCurrentIndex] = useState(0); 
    const [timeLeft, setTimeLeft] = useState(15); 
    const totalQuestions = QuestionData.length;

      
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

    
    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
        setCurrentIndex(currentIndex + 1);
        setTimeLeft(15); 
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

    const currentQuestion = QuestionData[currentIndex]; 
    const remainingQuestions = totalQuestions - currentIndex;

    // 진행률 계산 (링)
    const radius = 50; // 링의 반지름
    const circumference = 2 * Math.PI * radius; // 링의 둘레
    const progress = (timeLeft / 15) * circumference;

    return (
        <div className='container test-container'>
            <div className='wrapper'>
                <button className='arrow-btn'>
                    <img src={backIcon} alt="이전"  onClick={handlePrev} />
                    <p>이전</p>
                </button>
                <button className="arrow-btn"onClick={handleNext}
                disabled={currentIndex === QuestionData.length - 1}
                >
                    <p>다음</p>
                    <img src={nextIcon} alt="다음"/>
                </button>
            </div>

        {/* 링과 남은 질문 개수 */}
        <div className="progress-ring-container">
        <p>{currentIndex + 1} / {totalQuestions}</p> {/* 남은 질문 개수 */}
          <svg width="116.24" height="116.24">
            {/* 링 배경 */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#f5f5f5"
              strokeWidth="10"
              fill="none"
            />
            {/* 링 진행률 */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#f28b82"
              strokeWidth="10"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - progress}
              style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
            />
          </svg>
          <p position= 'absolute' top='50%'  transform = 'translate(-50%, -50%)'>{timeLeft}초</p> {/* 남은 시간 */}
        </div>
            <div className='question-container'>
                <QuestionCreate 
                            question={currentQuestion.question}
                            option1={currentQuestion.option1}
                            option2={currentQuestion.option2}
                            option3={currentQuestion.option3}
                            option4={currentQuestion.option4}
                />            
            </div>    
        </div>
        
    )
}

export default TestPage
