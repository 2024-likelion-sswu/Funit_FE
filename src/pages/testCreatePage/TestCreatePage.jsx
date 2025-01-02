import React, { useState } from 'react'
import nextIcon from '../../assets/img/test/next.png'
import QuestionCreate from '../../components/QuestionCreate'

const TestCreatePage = () => {

    // 예시 데이터
    const QuestionData = [
        {
            question: "가장 좋아하는 계절은?",
            option1: "봄",
            option2: "여름",
            option3: "가을",
            option4: "겨울"
        },
        {
            question: "가장 좋아하는 음식은?",
            option1: "치킨",
            option2: "피자",
            option3: "초밥",
            option4: "떡볶이"
        },
        {
            question: "가장 좋아하는 나라는?",
            option1: "한국",
            option2: "미국",
            option3: "중국",
            option4: "일본"
        },
        {
            question: "가장 좋아하는 디저트는?",
            option1: "아이스크림",
            option2: "초콜릿",
            option3: "마카롱",
            option4: "케이크"
        },
        {
            question: "가장 좋아하던 과목은?",
            option1: "국어",
            option2: "영어",
            option3: "수학",
            option4: "과학"
        },
        {
            question: "가장 큰 장점은?",
            option1: "유머감각",
            option2: "배려심",
            option3: "결단력",
            option4: "추진력"
        },
        {
            question: "가장 좋아하는 동물은?",
            option1: "강아지",
            option2: "고양이",
            option3: "햄스터",
            option4: "토끼"
        },
        {
            question: "갖고싶은 초능력은?",
            option1: "투명인간",
            option2: "순간이동",
            option3: "관심법",
            option4: "공중부양"
        },
        {
            question: "자주 쓰는 유행어는?",
            option1: "ㄹㅇㅋㅋ",
            option2: "어쩔티비",
            option3: "느좋",
            option4: "트민녀"
        },
        {
            question: "영화 속 주인공이라면?",
            option1: "해리포터",
            option2: "아이언맨",
            option3: "조커",
            option4: "엘사"
        }
    ]

    return (
        <div className='container text-create-container'>
            <div className='wrapper'>
                <button className='create-btn'>
                    <p>테스트 생성하기</p>
                    <img src={nextIcon} alt="다음 아이콘" />
                </button>
                <div className='question-container'>
                    {QuestionData.map((data,id) => 
                        <QuestionCreate 
                            question={data.question}
                            option1={data.option1}
                            option2={data.option2}
                            option3={data.option3}
                            option4={data.option4}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default TestCreatePage
