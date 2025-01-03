import React, { useState } from 'react'
import nextIcon from '../../assets/img/test/next.png'
import QuestionCustom from '../../components/QuestionCustom'
const TestCustomPage = () => {
    const [questions, setQuestions] = useState([<QuestionCustom key={0} />]);

    const addQuestion = () => {
        setQuestions([...questions, <QuestionCustom key={questions.length} />]);
    }
    return (
        <div className='container test-custom-container'>
            <div className='wrapper'>
                <button className='create-btn'>
                    <p>질문 추가하기</p>
                    <img src={nextIcon} alt="다음 아이콘" />
                </button>
                <div className='question-container'>
                    {questions.map((question) => question)}
                </div>
                <button className='add-question' onClick={addQuestion}>
                    +
                </button>
            </div>
        </div>
    )
}

export default TestCustomPage
