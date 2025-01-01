import React from 'react'
import icon from '../../assets/img/main/splash.png'

const MainPage = () => {
    return (
        <div className='container splash-screen'>
            <img src={icon} alt="스플레시 화면 아이콘" />
            <h1>펀잇</h1>
        </div>
    )
}

export default MainPage
