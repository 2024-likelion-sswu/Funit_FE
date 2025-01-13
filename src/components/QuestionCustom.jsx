import React, { useState } from 'react';

const QuestionCustom = ({ index, onChange }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null); // selectedAnswer를 인덱스로 저장

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
        onChange({
            question: event.target.value,
            options,
            selectedAnswer: selectedAnswerIndex !== null ? options[selectedAnswerIndex] : null, // 인덱스를 이용해 선택된 답을 전달
        });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
        onChange({
            question,
            options: updatedOptions,
            selectedAnswer: selectedAnswerIndex !== null ? updatedOptions[selectedAnswerIndex] : null,
        });
    };

    const handleOptionClick = (index) => {
        setSelectedAnswerIndex(index);
        onChange({
            question,
            options,
            selectedAnswer: options[index],
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
                                checked={selectedAnswerIndex === idx}  // 인덱스를 비교하여 체크
                                onChange={() => handleOptionClick(idx)}  // 선택된 옵션의 인덱스를 저장
                            />
                        </label>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default QuestionCustom;
