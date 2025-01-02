import React, { useState } from 'react'
import icon from '../../assets/img/character/purple.png'

const OnboardingPage = () => {
    const [nickname, setNickname] = useState('Guest');

    return (
        <div className='container onboarding-container'>
            <img src={ icon } alt="온보딩 화면 아이콘" />
            <p>{nickname}님 만의 테스트를 완성해볼까요?</p>
        </div>
    )
}

export default OnboardingPage
