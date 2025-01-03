import React, { useState } from 'react'

const QuestionCreate = ({question, option1, option2, option3, option4}) => {
    const [nickname, setNickname] = useState('Guest');
    const [clickOption, setClickOption] = useState('');

    const handleOption = (event) => {
        setClickOption(event.target.value);
    }

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
                            // className='radio-btn'
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
                            // className='radio-btn'
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
                            // className='radio-btn'
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
                            // className='radio-btn'
                        />
                    </label>
                </form>
            </div>
        </div>
    )
}

export default QuestionCreate
