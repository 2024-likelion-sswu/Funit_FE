import React from 'react'
import Button from '../../components/Button';

const NicknamePage = () => {
    return (
        <div className='container nickname-container'>
            <p className='input-ment'>닉네임을 입력하세요</p>
            <div>
                <input type='text' placeholder='닉네임' />
                <button>중복확인</button>
            </div>
            <input type='text' placeholder='비밀번호 입력' className='passsword-input'/>
            <Button title="시작하기"/>
        </div>
    )
}

export default NicknamePage
