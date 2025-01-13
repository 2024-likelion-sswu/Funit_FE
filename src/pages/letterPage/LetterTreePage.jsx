import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import treeImage from '../../assets/img/letter/tree.svg'; 
import envelopePink from '../../assets/img/letter/pinkletter.svg'; 
import envelopeBlue from '../../assets/img/letter/blueletter.svg';
import envelopePurple from '../../assets/img/letter/purpleletter.svg'; 
import envelopeYellow from '../../assets/img/letter/yellowletter.svg';
import letterImg from '../../assets/img/letter/letterOpen.png';
import iconPink from '../../assets/img/character/pink.png';

const LetterTreePage = () => {
  const navigate = useNavigate();


  const nickname = 'vvvvv';
  const receivedLetters = 5;


  const envelopeImages = [
    envelopePink,
    envelopeYellow,
    envelopeBlue,
    envelopePink,
    envelopePurple,
  ]; 


  // const handleLetterClick = (index) => {
  //   navigate('/letterRead', { state: { letterIndex: index } });
  // };

  
  // 편지 내용 부분
  const [loading,setLoading] = useState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);

  const letterOpen = (index) => {
    setLoading(true);
    setOpenLetter(false);

    setTimeout(() => {
      setLoading(false);
      setOpenLetter(true);
    }, 1000);
  };

  const letterClose = () => {
    setLoading(false);
    setOpenLetter(false);
    setSelectedLetter(null);
  }

  return (
    <div className="container letter-tree-container">
      <p className="letter-header">
        <strong>{nickname}</strong>님에게<br />
        {receivedLetters}개의 편지가 도착했어요!
      </p>
      <div className="tree-container">
        <img src={treeImage} alt="트리" className="tree-image" />
  
        <div className="envelope-container">
          {Array.from({ length: receivedLetters }).map((_, index) => (
            <img
              key={index}
              src={envelopeImages[index % envelopeImages.length]}
              alt={`편지 ${index + 1}`}
              className={`envelope envelope-${index + 1}`}
              onClick={() => letterOpen(index)}
            />
          ))}
        </div>
      </div>

      {/* 편지 내용 부분 */}
      {(loading || openLetter) && (
        <div className='tree-background'>
          {loading && (
            <img src={letterImg} alt='편지 아이콘' className='letter-open-icon'/>
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
      )}
    </div>
  );
};

export default LetterTreePage