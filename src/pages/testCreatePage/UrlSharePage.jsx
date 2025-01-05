import React, { useState } from 'react'
import icon from '../../assets/img/character/red.png'
import copyIcon from '../../assets/img/test/copy.svg'

const UrlSharePage = () => {
    const [nickname, setNickname] = useState('Guest');
    const [isCopy, setIsCopy] = useState(false);
    

    const copy = (text) => {
        try {
            navigator.clipboard.writeText(text);
            setIsCopy(true);
            setTimeout(() => setIsCopy(false), 3000);
        } catch(error) {
            console.log('링크 복사에 실패하였습니다.')
        }
    };

    return (
        <div className='container url-share-container'>
            <img src={icon} alt="url 공유 페이지 아이콘" />
            <p className='share-ment'>
                {nickname}님 만의 테스트가 만들어졌어요!
                <br />
                친구에게 공유해 볼까요?
            </p>
            <div className='btn-wrapper'>
                <button className='url-btn' onClick={() => copy(window.location.href)}>
                    <p>URL</p>
                    <img src={copyIcon} alt="복사 아이콘" />
                </button>
                {isCopy && (
                    <div className='copy-success'>복사 완료 !</div>
                )}
            </div>
        </div>
    )
}

export default UrlSharePage