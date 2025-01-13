import React, { useEffect, useState } from 'react'
import icon from '../../assets/img/character/purple.png'
import Button from '../../components/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axiosInstance from '../../apis/axiosInstance'

const OnboardingPage2 = () => {
    const location = useLocation();
    const testCount = location.state.testCount || 0;

    const navigate = useNavigate();

    const [nickname, setNickname] = useState('Guest');
    
    const getName = async () => {
        const nickname = localStorage.getItem('username');
        if (nickname) {
            const response = await axiosInstance.get(`/api/users/${nickname}`);
            console.log('사용자 정보 조회 성공 : ', response.data);
            setNickname(response.data.username);
        } else {
            alert('로그인이 필요합니다.');
            navigate('/nickname');
        }
    }

    useEffect(() => {
        getName();
    },[])
    
    return (
        <div className='container onboarding2-container'>
            <img src={icon} alt="온보딩2 화면 아이콘" />
            <p>질문을 10개 미만으로 선택하셨군요!
                <br />
                {nickname}님만의 질문을 만들어볼까요?
            </p>
            <div className='guide'>
                랜덤질문을 10개 미만으로 선택하면 직접 질문을 만들어야 돼요.
            </div>
            <Link to='/testCustom' state={{ testCount }}>
                <Button title='질문 만들러 가기' />
            </Link>
        </div>
    )
}

export default OnboardingPage2
