import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChoosePage = () => {
    const navigate = useNavigate();

    const test = () => {
        navigate("/testCreate")
    }
    const rank = () => {
        navigate("/ranking")
    }
    const tree = () => {
        navigate("/tree")
    }

    return (
        <div className='container choose-container'>
            <button className='btn' onClick={test}>테스트 생성하러 가기</button>
            <button className='btn' onClick={rank}>랭킹 보러 가기</button>
            <button className='btn' onClick={tree}>받은 편지 확인하러 가기</button>
        </div>
    )
}

export default ChoosePage
