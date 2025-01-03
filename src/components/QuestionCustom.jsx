import React, { useState } from 'react'

const QuestionCustom = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['','','','']);
    const [clickOption, setClickOption] = useState(null);

    const handleQuestion = (event) => {
        setQuestion(event.target.value);
    }
    
    const handleOption = (index, value) => {
        const changeOptions = [...options];
        changeOptions[index] = value;
        setOptions(changeOptions);
    }

    const handleOptionClick = (index) => {
        setClickOption(index);
    }

    // textarea의 높이를 text가 입력된 만큼 할당
    const handleHeight = (event) => {
        event.target.style.height='24px';
        event.target.style.height = `${event.target.scrollHeight}px`;
    }

    return (
        <div className='question-create-container'>
            <h2 className='question'>
                <strong>Q.</strong>
                <input 
                    type="text" 
                    placeholder='질문을 입력해주세요'
                    value={question}
                    onChange={handleQuestion}
                />
            </h2>
            <div className='option-container'>
                <form>
                    {options.map((option, index) => (
                        <label key={index} htmlFor={`option${index}`}>
                            <textarea 
                                type="text"
                                placeholder='입력'
                                value={option}
                                onChange={(event) => {
                                    handleOption(index,event.target.value);
                                    handleHeight(event);
                                }}
                            />
                            <input 
                                type="radio"
                                value={option}
                                name={`option${index}`}
                                id={`option${index}`}
                                checked={clickOption === index && option !==''}
                                onChange={()=>handleOptionClick(index)}
                            />
                        </label>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default QuestionCustom
