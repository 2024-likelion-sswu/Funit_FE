import React, { useState } from 'react';
import nextIcon from '../../assets/img/test/next.png';
import QuestionCustom from '../../components/QuestionCustom';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';

const TestCustomPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const testCount = 10 - location.state.testCount;

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
        updatedQuestions[index] = data;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        const formattedQuestions = questions.map((q) => ({
            question: q.question,
            options: q.options,
            selectedAnswer: q.selectedAnswer,
        }));

        try {
            const userId = localStorage.getItem('userId');
            const response = await axiosInstance.post('/api/plus_test', {
                userId,
                tests: formattedQuestions.map((q) => q.question),
                options: formattedQuestions.map((q) => q.options),
                answers: formattedQuestions.map((q) => q.selectedAnswer),
            });

            console.log('테스트 생성 성공:', response.data);
            navigate('/urlShare');
        } catch (error) {
            console.error('테스트 생성 실패:', error.response.data || error.message);
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
