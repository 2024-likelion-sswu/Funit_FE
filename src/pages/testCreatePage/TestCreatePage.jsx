import React, { useEffect, useState } from 'react'
import nextIcon from '../../assets/img/test/next.png'
import QuestionCreate from '../../components/QuestionCreate'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../apis/axiosInstance'

const TestCreatePage = () => {

    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [question, setQuestion] = useState([]); // 질문 생성자가 보게 되는 랜덤 질문 10개
    const [selectedQuestion, setSelectedQuestion] = useState([]); // 질문 생성자가 선택한 질문과 답변
    
    const getId = async () => {
        const nickname = localStorage.getItem('username');
        if (nickname) {
            const response = await axiosInstance.get(`/api/users/${nickname}`);
            console.log('사용자 정보 조회 성공 : ', response.data);
            setUserId(response.data.id);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/nickname');
        }
    }

    const getQuestion = async () => {
        try {
            if (!userId) {
                console.log('userId 없음',userId);
                alert('로그인이 필요합니다.');
                navigate('/nickname');
            }
    
            const response = await axiosInstance.get('/api/questions');
    
            console.log('질문 20개 가져오기 : ', response.data);
    
            const temp = response.data;
            for (let i = 0; i < 20; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            console.log('질문 20개 순서 섞기 : ', temp);
            setQuestion(temp.slice(0, 10));
        } catch (error) {
            console.error('질문 20개 가져오기 실패 : ', error.response?.data);
            alert('질문을 가져오는 데 실패했습니다.');
        }
    };

    const handleQuestion = (question, options, selectedAnswer) => {
        setSelectedQuestion((prev) => [
            ...prev, {question, options, selectedAnswer}
        ])
    }

    const submitQuestion = async () => {
        try {
            console.log('tests',selectedQuestion.map(q => q.question));
            console.log('options',selectedQuestion.map(q => q.options));
            console.log('answers',selectedQuestion.map(q => q.selectedAnswer));
            console.log('userId',userId);

            const response = await axiosInstance.post('/api/random_test', {
                userId,
                tests: selectedQuestion.map(q => q.question),
                options: selectedQuestion.map(q => q.options),
                answers: selectedQuestion.map(q => q.selectedAnswer),
            })
            console.log('테스트 생성 성공 : ', response.data);
            console.log('질문 개수 : ', response.data.testCount);
            if (response.data.testCount<10) {
                navigate('/onboarding2', { state: { testCount: response.data.testCount } });
            } else {
                navigate('/urlShare');
            }
        } catch(error) {
            console.log('질문 생성 실패 : ', error);
        }
    }

    useEffect(() => {
        const initialize = async () => {
            await getId();
        };
        initialize();
    }, []);

    useEffect(() => {
        if (userId) {
            getQuestion(userId);
        }
    }, [userId]);

    return (
        <div className='container text-create-container'>
            <div className='wrapper'>
                <button className='create-btn' onClick={submitQuestion}>
                    <p>테스트 생성하기</p>
                    <img src={nextIcon} alt="다음 아이콘" />
                </button>
                <div className='question-container'>
                    {question.map((data, id) => 
                        <QuestionCreate 
                            key={id}
                            question={data.question}
                            option1={data.optionList[0]}
                            option2={data.optionList[1]}
                            option3={data.optionList[2]}
                            option4={data.optionList[3]}
                            onAnswerSelect={(selectedAnswer) =>
                                handleQuestion(
                                    data.question,
                                    data.optionList,
                                    selectedAnswer
                                )
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestCreatePage
