import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';
import icon from '../../assets/img/character/sad.png';

const Score3Page = () => {
    const { state } = useLocation();
    const [score, setScore] = useState(state?.score || 0); // 네비게이트로 전달된 점수
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        const fetchNicknameAndScore = async () => {
            try {
                const storedNickname = localStorage.getItem('username');
                setNickname(storedNickname || 'Unknown');

            } catch (error) {
                console.error('점수나 닉네임을 가져오는 중 오류 발생:', error.response || error);
                alert('데이터를 불러오는 데 실패했습니다.');
            }
        };

        fetchNicknameAndScore();
    }, [score]);

    return (
        <div className='container score-container'>
            <h2>
                <span style={{ color: "#FF7F71" }}>{score}</span>점
            </h2>
            <h3>{nickname}님과 대화가 필요할 것 같아요!</h3>
            <img src={icon} alt="3점" />
        </div>
    );
};

export default Score3Page;
