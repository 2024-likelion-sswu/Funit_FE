import React, { useState } from 'react'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';

const NicknamePage = () => {
    const navigate = useNavigate();

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [available, setAvailable] = useState(false);

    const handleNickname = (event) => {
        setNickname(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const checkNickname = async () => {
        try {
            const response = await axiosInstance.get('/api/users/check-nickname', {
                params: { nickname },
            });

            console.log(response.data);
            if (response.data.available) {
                setAvailable(true);
                alert('사용 가능한 닉네임입니다.');
            } else {
                alert('이미 사용 중인 닉네임입니다.');
            }
        } catch (error) {
            alert('닉네임 중복 확인에 실패했습니다.');
        }
    };

    const handleStartBtn = async () => {
        try {
            if (available) {
                await axiosInstance.post('/api/users', { 
                    nickname, 
                    password 
                });
            }
            const response = await axiosInstance.post('/api/auth/login', { 
                nickname,
                password 
            });
            console.log('로그인 성공:', response.data);
            localStorage.setItem('username', nickname);
            navigate('/onboarding');
        } catch (error) {
            console.error('로그인 에러:', error);
            if (error.response.status === 403) {
                alert('비밀번호가 틀렸습니다. 다시 시도해주세요.');
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        }
    };
    

    return (
        <div className='container nickname-container'>
            <p className='input-ment'>닉네임을 입력하세요</p>
            <div>
                <input type='text' placeholder='닉네임' onChange={handleNickname}/>
                <button onClick={checkNickname}>중복확인</button>
            </div>
            <input type='text' placeholder='비밀번호 입력' className='passsword-input' onChange={handlePassword}/>
            <Button title="시작하기" onClick={handleStartBtn}/>
        </div>
    )
}

export default NicknamePage