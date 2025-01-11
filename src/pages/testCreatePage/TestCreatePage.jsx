import React, { useEffect, useState } from 'react';
import nextIcon from '../../assets/img/test/next.png';
import QuestionCreate from '../../components/QuestionCreate';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../apis/axiosInstance';

const TestCreatePage = () => {
    const navigate = useNavigate();
    console.log('TestCreatePage.jsx에서의 현재 쿠키:', document.cookie);

    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [question, setQuestion] = useState([]); // 질문 생성자가 보게 되는 랜덤 질문 10개

    useEffect(() => {
        const fetchData = async () => {
            await getId(); // 사용자 정보 가져오기
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchAndRequestQuestions = async () => {
            await getQuestion();   // 질문 가져오기
        };

        if (userId) {
            fetchAndRequestQuestions();
        }
    }, [userId]);

    const getId = async () => {
        try {
            const username = localStorage.getItem('username');
            console.log('사용자 이름 : ', username);
            const response = await axiosInstance.get(`/api/users/${username}`);
            setUsername(username);
            setUserId(response.data.id);
            console.log('setUserId : ', response.data.id);
            console.log('사용자 정보 조회 성공 : ', response.data);
        } catch (error) {
            console.error('로그인 상태 확인 실패 :', error);
            // alert('로그인이 필요합니다.');
            navigate('/nickname');
        }
    };

    const getQuestion = async () => {
        try {
            const response = await axiosInstance.get('/api/questions');
            console.log("getQuestion 응답 성공 :", response.data);
            setQuestion(response.data);
        } catch (error) {
            console.error("getQuestion 응답 에러 :", error);
            if (error.response) {
                console.error("getQuestion 응답 데이터:", error.response.data);
                console.error("getQuestion 응답 상태:", error.response.status);
                console.error("getQuestion 응답 헤더:", error.response.headers);
                if (error.response.status === 403) {
                    console.log('접근 권한이 없습니다. 다시 로그인해주세요.');
                    // navigate('/nickname');
                }
            } else {
                console.log('서버와의 연결에 실패했습니다.');
            }
        }
    };
    
    return (
        <div className='container text-create-container'>
            <div className='wrapper'>
                <button className='create-btn'>
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
    );
};

export default TestCreatePage;

