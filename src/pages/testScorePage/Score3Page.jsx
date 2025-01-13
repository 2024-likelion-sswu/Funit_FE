import React, { useState, useEffect } from 'react';
import icon from '../../assets/img/character/sad.png'

const Score3Page = () => {
    const [score] = useState(3); 
    const [nickname, setNickname] = useState('');
    useEffect(() => {
                const fetchNickname = async () => {
                    try {
                        const storedNickname = localStorage.getItem('username');
                        setNickname(storedNickname); 
                        
                    } catch (error) {
                        console.error('닉네임을 가져오는 중 오류 발생:', error.response || error);
                        alert('닉네임을 가져오는 데 실패했습니다.');
                    }
                };
        
                fetchNickname();
            }, []);
    return (
        <div className='container score-container'>
            <h2><span style={{color:"#FF7F71"}}>{score}</span>점</h2>
            <h3>{nickname}님과 대화가 필요할 것 같아요 !</h3>
            <img src={icon} alt="3점" />
        </div>
    )
}

export default Score3Page



