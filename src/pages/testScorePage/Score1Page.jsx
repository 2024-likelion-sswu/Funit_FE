import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import icon from '../../assets/img/character/mint.png';
import axiosInstance from '../../apis/axiosInstance';

const Score1Page = () => {
    const { state } = useLocation(); // 네비게이트로 전달된 state (점수, createdBy ID 등 포함)
    const [score, setScore] = useState(state?.score || null); // 전달된 점수
    const [nickname, setNickname] = useState(''); // testcreated의 닉네임
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTestCreatorNickname = async () => {
            try {
                if (!state?.createdBy) {
                    console.error('createdBy 정보가 없습니다.');
                    return;
                }

                // createdBy를 사용해 닉네임 가져오기
                const response = await axiosInstance.get(`/api/users/${state.createdBy}`, {
                    withCredentials: true,
                });

                const fetchedNickname = response.data.nickname; // API 응답에서 닉네임 추출
                setNickname(fetchedNickname); // 닉네임 상태 업데이트
                console.log('Fetched test creator nickname:', fetchedNickname);
            } catch (error) {
                console.error('testcreated 닉네임을 가져오는 중 오류 발생:', error.response || error);
                alert('데이터를 불러오는 데 실패했습니다.');
            }
        };

        fetchTestCreatorNickname();
    }, [state?.createdBy]); // createdBy가 변경될 때마다 실행

    const handleButtonClick = () => {
        navigate('/tree'); 
    };

    return (
        <div className='container score-container'>
            <h2>
                <span style={{ color: "#FF7F71" }}>{score}</span>점
            </h2>
            <h3>{nickname}님과 통하는 사이!</h3>
            <img src={icon} alt="10점" />
            <div className='alert'>
                <p>6점을 넘기면 친구에게 편지를 받을 수 있어요!</p>
                <Button title="받은 편지 확인하러 가기" onClick={handleButtonClick}/>
            </div>
        </div>
    );
};

export default Score1Page;
