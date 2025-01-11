import React, { useEffect, useState } from 'react'
import nextIcon from '../../assets/img/test/next.png'
import QuestionCreate from '../../components/QuestionCreate'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../apis/axiosInstance'

const TestCreatePage = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState();
    const [question, setQuestion] = useState([]); // 질문 생성자가 보게 되는 랜덤 질문 10개
    const [selectedQuestion, setSelectedQuestion] = useState([]); // 질문 생성자가 선택한 질문과 답변
    
    const getId = async () => {
        try {
            const username = localStorage.getItem('username');
            console.log('사용자 이름 : ', username);
            const response = await axiosInstance.get(`/api/users/${username}`);
            setUserId(username);
            console.log('사용자 정보 조회 성공 : ', response.data);
        } catch (error) {
            console.error('로그인 상태 확인 실패 :', error);
            alert('로그인이 필요합니다.');
            navigate('/nickname');
        }
    };

    const getQuestion = async () => {
        try {
            const response = await axiosInstance.get('/api/questions');
            console.log('질문 20개 : ', response.data);
    
            const temp = response.data;
            for (let i = 0; i < 20; i++) {
                const j = Math.floor(Math.random() * (i + 1));
                [temp[i], temp[j]] = [temp[j], temp[i]];
            }
            setQuestion(temp.slice(0, 10));
        } catch (error) {
            if (error.response?.status === 403) {
                console.error('로그인이 필요합니다.');
                // alert('로그인이 필요합니다.');
                // navigate('/nickname');
            } else {
                console.error('질문 가져오기 실패:', error);
            }
        }
    };

    useEffect(() => {
        getId();
        getQuestion();
    },[]);

    return (
        <div className='container text-create-container'>
            <div className='wrapper'>
                <button className='create-btn' >
                    <p>테스트 생성하기</p>
                    <img src={nextIcon} alt="다음 아이콘" />
                </button>
                <div className='question-container'>
                    {question.map((data, id) => 
                        <QuestionCreate 
                            key={id}
                            question={data.question}
                            option1={data.optionList[0]}
                            option2={data.optionList[1]}
                            option3={data.optionList[2]}
                            option4={data.optionList[3]}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestCreatePage
