import React, { useEffect } from 'react'
import icon from '../../assets/img/main/splash.png'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/nickname');
        },2000);

        return() => clearTimeout(timer);
    },[navigate])

    return (
        <div className='container splash-screen'>
            <img src={icon} alt="스플레시 화면 아이콘" />
            <h1>펀잇</h1>
        </div>
    )
}

export default MainPage
