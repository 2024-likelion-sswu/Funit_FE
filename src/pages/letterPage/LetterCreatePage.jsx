import React, { useState } from 'react'
import Button from '../../components/Button'
import checkPink from '../../assets/img/letter/checkPink.svg'
import checkBlue from '../../assets/img/letter/checkBlue.svg'
import checkYellow from '../../assets/img/letter/checkYellow.svg'
import iconPink from '../../assets/img/character/pink.png'
import iconBlue from '../../assets/img/character/skyblue.png'
import iconYellow from '../../assets/img/character/yelloweye.png'

const LetterCreatePage = () => {
    const [clickLetter, setClickLetter] = useState('pink');

    const handleLetter = (event) => {
        setClickLetter(event);
    }

    const handleLetterColor = () => {
        switch (clickLetter) {
            case 'pink':
                return 'rgb(255, 127, 113, 0.3)';
            case 'blue':
                return 'rgb(179, 226, 225, 0.4)';
            case 'yellow':
                return 'rgb(255, 238, 177, 0.4)';
            default:
                return 'rgb(255, 127, 113, 0.3)';
        }
        
    }

    return (
        <div className='container letter-create-container'>
            <h2>편지지를 골라주세요!</h2>
            <div className="wrapper">
                <div className='letter-container'>
                    <div 
                        className={`letter-box pink-box ${clickLetter === 'pink' ? 'pink' : ''}`}
                        onClick={() => handleLetter('pink')}
                    >
                        <img src={iconPink} alt="pink icon" className='character-icon'/>
                        {clickLetter === 'pink' && <img src={checkPink} alt="pink check" className='check-icon' />}
                    </div>
                    <div 
                        className={`letter-box blue-box ${clickLetter === 'blue' ? 'blue' : ''}`}
                        onClick={() => handleLetter('blue')}
                    >
                        <img src={iconBlue} alt="blue icon" className='character-icon' />
                        {clickLetter === 'blue' && <img src={checkBlue} alt="blue check" className='check-icon' />}
                    </div>
                    <div 
                        className={`letter-box yellow-box ${clickLetter === 'yellow' ? 'yellow' : ''}`}
                        onClick={() => handleLetter('yellow')}
                    >
                        <img src={iconYellow} alt="yellow icon" className='character-icon' />
                        {clickLetter==='yellow' && <img src={checkYellow} alt="yellow check" className='check-icon' />}
                    </div>
                </div>
                <div className='textarea-container'>
                    <textarea 
                        className='letter'
                        placeholder='내용을 작성해주세요.'
                        style={{backgroundColor: handleLetterColor()}}
                    >
                    </textarea>
                    {clickLetter === 'pink' && <img src={iconPink} alt="편지 아이콘" />}
                    {clickLetter === 'blue' && <img src={iconBlue} alt="편지 아이콘" />}
                    {clickLetter === 'yellow' && <img src={iconYellow} alt="편지 아이콘" />}
                </div>
                    
            </div>
            <Button title='편지 보내기'/>
        </div>
    )
}

export default LetterCreatePage
