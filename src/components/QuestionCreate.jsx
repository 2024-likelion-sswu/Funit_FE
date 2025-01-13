import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionCreate = ({ question, options = [], onAnswerSelect }) => {
    const [nickname, setNickname] = useState('Guest');
    const [clickOption, setClickOption] = useState('');
    const navigate = useNavigate();

    const handleOption = (event) => {
        setClickOption(event.target.value);
        onAnswerSelect(event.target.value);
    };

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setNickname(username);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="question-create-container">
            <h2 className="question">
                <strong>Q.</strong>
                {nickname}님이 {question}
            </h2>
            <div className="option-container">
                <form>
                    {options.map((option, index) => (
                        <label key={index} htmlFor={`${question}-${index}`}>
                            <span>{option}</span>
                            <input
                                type="radio"
                                value={option}
                                name={question}
                                id={`${question}-${index}`}
                                checked={clickOption === option}
                                onChange={handleOption}
                            />
                        </label>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default QuestionCreate;
