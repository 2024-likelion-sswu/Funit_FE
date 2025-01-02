import React from 'react'
import Button from '../../components/Button';

const NicknamePage = () => {
    return (
        <div className='container nickname-container'>
            <p className='input-ment'>닉네임을 입력하세요</p>
            <div>
                <input placeholder='닉네임' />
                <button>중복확인</button>
            </div>
            <Button title="시작하기"/>
        </div>
    )
}

export default NicknamePage
