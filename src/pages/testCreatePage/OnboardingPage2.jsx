import React, { useState } from 'react'
import icon from '../../assets/img/character/purple.png'
import Button from '../../components/Button'

const OnboardingPage2 = () => {
    const [nickname, setNickname] = useState('Guest');
    
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
            <Button title='질문 만들러 가기' />
        </div>
    )
}

export default OnboardingPage2
