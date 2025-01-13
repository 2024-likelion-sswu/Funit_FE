import React, { useEffect, useState } from 'react';
import nextIcon from '../../assets/img/test/next.png';
import QuestionCustom from '../../components/QuestionCustom';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';

const TestCustomPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const testCount = 10 - location.state.testCount;

    const [userId, setUserId] = useState();
    const getId = async () => { 
        const nickname = localStorage.getItem('username');
        if (nickname) {
            const response = await axiosInstance.get(`/api/users/${nickname}`);
            console.log('사용자 정보 조회 성공 : ', response.data);
            setUserId(response.data.id);
            console.log('TestCustomPage.jsx에서의 id', userId);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/nickname');
        }
    }

    useEffect(() => {
        getId();
    },[]);

    const [questions, setQuestions] = useState(
        Array.from({ length: testCount }, (_, index) => ({
            id: index,
            question: '',
            options: ['', '', '', ''],
            selectedAnswer: null,
        }))
    );

    const handleQuestionChange = (index, data) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index] = { ...updatedQuestions[index], ...data }; // 데이터를 합쳐서 업데이트
        setQuestions(updatedQuestions);
    };
    

    const handleSubmit = async () => {
        console.log('userId: ',userId);
        const formattedQuestions = questions.map((q) => ({
            question: q.question,
            options: q.options,
            selectedAnswer: q.selectedAnswer,
        }));

        try {
            console.log('userId',userId);
            console.log('tests',formattedQuestions.map((q) => q.question));
            console.log('options',formattedQuestions.map((q) => q.options));
            console.log('answers',formattedQuestions.map((q) => q.selectedAnswer));
            const response = await axiosInstance.post('/api/plus_test', {
                userId:userId,
                tests: formattedQuestions.map((q) => q.question),
                options: formattedQuestions.map((q) => q.options),
                answers: formattedQuestions.map((q) => q.selectedAnswer),
            });

            console.log('테스트 생성 성공:', response.data);
            navigate('/urlShare');
        } catch (error) {
            console.error('테스트 생성 실패:', error);
            alert('테스트 생성에 실패했습니다.');
        }
    };

    return (
        <div className="container test-custom-container">
            <div className="wrapper">
                <button className="create-btn" onClick={handleSubmit}>
                    <p>테스트 제출하기</p>
                    <img src={nextIcon} alt="다음 아이콘" />
                </button>
                <div className="question-container">
                    {questions.map((data, index) => (
                        <QuestionCustom
                            key={index}
                            index={index}
                            onChange={(updatedData) => handleQuestionChange(index, updatedData)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestCustomPage;
