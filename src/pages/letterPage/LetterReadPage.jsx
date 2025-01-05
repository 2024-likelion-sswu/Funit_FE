import React, { useState } from 'react'
import letterOpen from '../../assets/img/letter/letterOpen.png'
import iconPink from '../../assets/img/character/pink.png'

const LetterReadPage = () => {
    const [loading,setLoading] = useState(false);
    const [openLetter, isOpenLetter] = useState(false);

    const LetterOpen = () => {
        setLoading(true);
        isOpenLetter(false);

        setTimeout(() => {
            setLoading(false);
            isOpenLetter(true);
        }, 1000);
    };

    const letterClose = () => {
        setLoading(false);
        isOpenLetter(false);
    }

    return (
        <div className='container letter-read-container'>
            <button onClick={LetterOpen}>
                편지
            </button>
            {loading && (
                <img src={letterOpen} alt='편지 아이콘' className='letter-open-icon'/>
            )}
            {openLetter && (
                <div className='letter-container'>
                    <div className='letter'>
                        <div className='letter-content'>
                        안녕, [닉네임]! <br /><br />요즘 어떻게 지내? <br />네가 좋아하는 테니스는 잘하고 있겠지?<br /><br /> 나는 요즘 열심히 공부 하면서 지내고 있어. 가끔 네가 생각날 때마다 예전에 함께했던 추억들이 떠오르더라. 그때 많이 웃고 즐거웠던 기억이 참 소중하게 느껴져.<br /><br /> 조만간 우리 꼭 만나서 맛있는 거 먹고 이야기 나누자! 나도 곧 테스트 만들 테니까 기대해! 😄
                        </div>
                        <div className='letter-bottom'>
                            <img src={iconPink} alt="편지지 아이콘" />
                        </div>
                    </div>
                    <button className='letter-close' onClick={letterClose}>
                        확인
                    </button>
                </div>
            )}
        </div>
    )
}

export default LetterReadPage
