import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import icon from '../../assets/img/character/mint.png';
import axiosInstance from '../../apis/axiosInstance';

const UrlFriend = () => {
    const { userNickname } = useParams(); // URL에서 userId 가져오기
    const [nickname, setNickname] = useState(''); // 닉네임 상태
    const navigate = useNavigate();
    console.log(userNickname);

    useEffect(() => {
        const fetchNickname = async () => {
            try {
                console.log(`Fetching nickname for userId: ${userNickname}`);
                
                // userId를 사용해 닉네임 가져오기
                const response = await axiosInstance.get(`/api/users/${userNickname}`, {
                    withCredentials: true,
                });

                const fetchedNickname = response.data.nickname; // API 응답에서 닉네임 추출
                setNickname(fetchedNickname); // 닉네임 상태 업데이트
                console.log('Fetched nickname:', fetchedNickname);
            } catch (error) {
                console.error('Error fetching nickname:', error.response || error);
                alert('사용자를 찾을 수 없습니다. 로그인 페이지로 이동합니다.');
                navigate('/nickname'); // 에러 발생 시 /nickname으로 리다이렉트
            }
        };

        fetchNickname();
    }, [userNickname, navigate]);

    useEffect(() => {
        // 3초 후 /test/{userId} 페이지로 이동
        const timer = setTimeout(() => {
            navigate(`/test/${userNickname}`); // userId를 경로에 포함
        }, 3000);

        return () => clearTimeout(timer); // 타이머 클린업
    }, [navigate, userNickname]);

    return (
        <div className='container urlfriend'>
            <img src={icon} alt="URL 받은 친구 아이콘" />
            <h3>
                {nickname 
                    ? `${nickname}님의 테스트가 도착했어요! 풀어볼까요?`
                    : '테스트 데이터를 가져오는 중입니다...'}
            </h3>
        </div>
    );
};

export default UrlFriend;
