import React, { use, useState } from 'react'
import Button from '../../components/Button'
import checkPink from '../../assets/img/letter/checkPink.svg'
import checkBlue from '../../assets/img/letter/checkBlue.svg'
import checkYellow from '../../assets/img/letter/checkYellow.svg'
import iconPink from '../../assets/img/character/pink.png'
import iconBlue from '../../assets/img/character/skyblue.png'
import iconYellow from '../../assets/img/character/yelloweye.png'
import axiosInstance from './../../apis/axiosInstance';
import { useLocation, useNavigate } from 'react-router-dom'

const LetterCreatePage = () => {
    const { state } = useLocation();

    const [clickLetter, setClickLetter] = useState('pink');
    const [content, setContent] = useState('');
    const [receiverNickname, setReceiverNickname]= useState(state?.recipientNickname || '');

    const navigate = useNavigate();

    const senderNickname = localStorage.getItem('username');

    const handleLetter = (event) => {
        setClickLetter(event);
    }

    const handleLetterColor = () => {
        switch (clickLetter) {
            case 'pink':
                return '#ffe4e1';
            case 'blue':
                return '#e1f5fe';
            case 'yellow':
                return '#fff9c4';
            default:
                return '#ffe4e1';
        }
    }

    const submitLetter = async () => {
        const paperColor = 
            clickLetter === 'pink' ? 'red' :
            clickLetter === 'blue' ? 'blue' :
            clickLetter === 'yellow' ? 'yellow' : 'red';
            console.log('편지지 색상 : ', paperColor);
            console.log('편지 내용: ', content);
            console.log('편지 보내는 사람', senderNickname);
            console.log('편지 받는 사람 :', receiverNickname);
        try {
            const response = await axiosInstance.post('/api/letters', {
                senderNickname:senderNickname,
                receiverNickname:receiverNickname,
                content:content,
                paperColor:paperColor,
            });
            console.log('편지 생성 : ', response);
            navigate('/ranking');
        } catch(error) {
            console.log('편지 생성 오류 : ', error);
        }
    }

    return (
        <div className='container letter-create-container'>
            <h2>편지지를 골라주세요!</h2>
            <div className="wrapper">
                <div className='letter-container'>
                    <div 
                        className={`letter-box pink-box ${clickLetter === 'pink' ? 'pink' : ''}`}
                        onClick={() => handleLetter('red')}
                    >
                        <img src={iconPink} alt="pink icon" className='character-icon'/>
                        {clickLetter === 'red' && <img src={checkPink} alt="pink check" className='check-icon' />}
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
                        onChange={(e) => setContent(e.target.value)}
                    >
                    </textarea>
                    {clickLetter === 'pink' && <img src={iconPink} alt="편지 아이콘" />}
                    {clickLetter === 'red' && <img src={iconPink} alt="편지 아이콘" />}
                    {clickLetter === 'blue' && <img src={iconBlue} alt="편지 아이콘" />}
                    {clickLetter === 'yellow' && <img src={iconYellow} alt="편지 아이콘" />}
                </div>
                    
            </div>
            <Button title='편지 보내기' onClick={submitLetter}/>
        </div>
    )
}

export default LetterCreatePage
