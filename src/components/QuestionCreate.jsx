import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const QuestionCreate = ({question, option1, option2, option3, option4, onAnswerSelect}) => {
    const [nickname, setNickname] = useState('Guest');
    const [clickOption, setClickOption] = useState('');

    const navigate = useNavigate();

    const handleOption = (event) => {
        setClickOption(event.target.value);
        onAnswerSelect(event.target.value);
    }

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setNickname(username);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/');
        }
    })

    return (
        <div className='question-create-container'>
            <h2 className='question'>
                <strong>Q.</strong>
                {nickname}님이 {question}
            </h2>
            <div className='option-container'>
                <form>
                    <label htmlFor={`${question}1`}>
                        <span>{option1}</span>
                        <input 
                            type="radio" 
                            value={option1} 
                            name={question}
                            id={`${question}1`}
                            checked={clickOption===option1}
                            onChange={handleOption}
                        />
                    </label>
                    <label htmlFor={`${question}2`}>
                        <span>{option2}</span>
                        <input 
                            type="radio" 
                            value={option2} 
                            name={question}
                            id={`${question}2`}
                            checked={clickOption===option2}
                            onChange={handleOption}
                        />
                    </label>
                    <label htmlFor={`${question}3`}>
                        <span>{option3}</span>
                        <input 
                            type="radio" 
                            value={option3} 
                            name={question}
                            id={`${question}3`}
                            checked={clickOption===option3}
                            onChange={handleOption}
                        />
                    </label>
                    <label htmlFor={`${question}4`}>
                        <span>{option4}</span>
                        <input 
                            type="radio" 
                            value={option4} 
                            name={question}
                            id={`${question}4`}
                            checked={clickOption===option4}
                            onChange={handleOption}
                        />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default QuestionCreate
