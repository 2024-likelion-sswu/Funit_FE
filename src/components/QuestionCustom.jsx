import React, { useState } from 'react';

const QuestionCustom = ({ index, onChange }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
        onChange({
            question: event.target.value,
            options,
            selectedAnswer,
        });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
        onChange({
            question,
            options: updatedOptions,
            selectedAnswer,
        });
    };

    const handleOptionClick = (index) => {
        setSelectedAnswer(index);
        onChange({
            question,
            options,
            selectedAnswer: index,
        });
    };

    const handleHeight = (event) => {
        event.target.style.height = '24px';
        event.target.style.height = `${event.target.scrollHeight}px`;
    };

    return (
        <div className="question-create-container">
            <h2 className="question">
                <strong>Q.</strong>
                <input
                    type="text"
                    placeholder="질문을 입력해주세요"
                    value={question}
                    onChange={handleQuestionChange}
                />
            </h2>
            <div className="option-container">
                <form>
                    {options.map((option, idx) => (
                        <label key={idx} htmlFor={`option${index}-${idx}`}>
                            <textarea
                                type="text"
                                placeholder="입력"
                                value={option}
                                onChange={(event) => {
                                    handleOptionChange(idx, event.target.value);
                                    handleHeight(event);
                                }}
                            />
                            <input
                                type="radio"
                                name={`option${index}`}
                                id={`option${index}-${idx}`}
                                checked={selectedAnswer === idx && option !== ''}
                                onChange={() => handleOptionClick(idx)}
                            />
                        </label>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default QuestionCustom;
