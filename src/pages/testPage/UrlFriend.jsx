import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import icon from '../../assets/img/character/mint.png';

const UrlFriend = () => {
    const { userId } = useParams(); // URL에서 userId 가져오기
    const [nickname, setNickname] = useState('vvvvv'); // 닉네임 상태를 하드코딩된 값으로 설정
    const navigate = useNavigate();

    useEffect(() => {
        // 3초 후 /test/{userId} 페이지로 이동
        const timer = setTimeout(() => {
            navigate(`/test/${userId}`); // userId를 경로에 포함
        }, 3000);

        return () => clearTimeout(timer); // 타이머 클린업
    }, [navigate, userId]);

    return (
        <div className='container urlfriend'>
            <img src={icon} alt="URL 받은 친구 아이콘" />
            <h3>
                {`${nickname}님의 테스트가 도착했어요! 풀어볼까요?`}
            </h3>
        </div>
    );
};

export default UrlFriend;
