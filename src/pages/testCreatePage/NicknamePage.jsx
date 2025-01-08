import React, { useState } from 'react'
import Button from '../../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NicknamePage = () => {
    const BASE_URL = 'https://dreamcatcherrr.store';

    const naviagte = useNavigate();

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
            const response = await axios.get('https://dreamcatcherrr.store/api/users/check-nickname', {
                params: { nickname },
            });
            
            console.log(response.data);
            if (response.data.available) {
                setAvailable(true);
                alert('사용 가능한 닉네임입니다.');
            } else {
                alert('이미 사용 중인 닉네임입니다.');
            }
        }
        catch(error) {
            alert('닉네임 중복 확인에 실패했습니다.');
        }
    }

    const handleStartBtn = async () => {
        try {
            if (available) {
                await axios.post(`${BASE_URL}/api/users`, {
                    nickname,
                    password
                }
            )}
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                username: nickname,
                password
            })
            const { token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', nickname);
            console.log('로그인 성공');
            naviagte('/onboarding');
        } catch(error) {
            console.log('로그인 에러: ',error);
            if (error.response.status === 403) {
                alert('비밀번호가 틀렸습니다. 다시 시도해주세요.')
            } else {
                alert('로그인에 실패했습니다. 다시 시도해주세요.');
            }
        }
    }

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
