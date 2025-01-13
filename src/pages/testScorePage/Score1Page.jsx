import React, { useState, useEffect } from 'react';
import Button from '../../components/Button';
import icon from '../../assets/img/character/mint.png';


const Score1Page = () => {
    const [score] = useState(10); 
    const [nickname, setNickname] = useState(''); // 유저 닉네임

    useEffect(() => {
        const fetchNickname = async () => {
            try {
                const storedNickname = localStorage.getItem('username');
                setNickname(storedNickname); // localStorage에 저장된 닉네임 사용
                
            } catch (error) {
                console.error('닉네임을 가져오는 중 오류 발생:', error.response || error);
                alert('닉네임을 가져오는 데 실패했습니다.');
            }
        };

        fetchNickname();
    }, []);

    return (
        <div className='container score-container'>
            <h2>
                <span style={{ color: "#FF7F71" }}>{score}</span>점
            </h2>
            <h3>{nickname}님과 통하는 사이!</h3>
            <img src={icon} alt="10점" />
            <div className='alert'>
                <p>6점을 넘기면 친구에게 편지를 받을 수 있어요!</p>
                <Button title="받은 편지 확인하러 가기" />
            </div>
        </div>
    );
};

export default Score1Page;
