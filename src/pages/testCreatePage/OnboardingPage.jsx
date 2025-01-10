import React, { useEffect, useState } from 'react'
import icon from '../../assets/img/character/purple.png'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';

const OnboardingPage = () => {

    const [nickname, setNickname] = useState('Guest');

    const navigate = useNavigate();

    const getId = async () => {
        try {
            const username = localStorage.getItem('username');
            console.log('사용자 이름 : ', username);
            const response = await axiosInstance.get(`/api/users/${username}`);
            setNickname(username);
            console.log('사용자 정보 조회 성공 : ', response.data);
        } catch (error) {
            console.error('로그인 상태 확인 실패 :', error);
            alert('로그인이 필요합니다.');
            navigate('/nickname');
        }
    };
    

    useEffect(() => {
        getId();
        const timer = setTimeout(() => {
            navigate('/testCreate');
        },2000);

        return() => clearTimeout(timer);
    },[navigate]);


    return (
        <div className='container onboarding-container'>
            <img src={ icon } alt="온보딩 화면 아이콘" />
            <p>{nickname}님 만의 테스트를 완성해볼까요?</p>
        </div>
    )
}

export default OnboardingPage
