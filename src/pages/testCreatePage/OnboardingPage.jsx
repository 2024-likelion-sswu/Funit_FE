import React, { useEffect, useState } from 'react'
import icon from '../../assets/img/character/purple.png'
import { useNavigate } from 'react-router-dom';

const OnboardingPage = () => {
    const BASE_URL = 'https://dreamcatcherrr.store';

    const [nickname, setNickname] = useState('Guest');

    const navigate = useNavigate();

    useEffect(() => {
        const username = localStorage.getItem('username');
        if (username) {
            setNickname(username);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/');
        }
    },[]);

    useEffect(() => {
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
