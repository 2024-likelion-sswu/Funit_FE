import React, { useEffect, useState } from 'react';
import treeImage from '../../assets/img/letter/tree.svg'; 
import envelopePink from '../../assets/img/letter/pinkletter.svg'; 
import envelopeBlue from '../../assets/img/letter/blueletter.svg';
import envelopePurple from '../../assets/img/letter/purpleletter.svg'; 
import envelopeYellow from '../../assets/img/letter/yellowletter.svg';
import letterImg from '../../assets/img/letter/letterOpen.png';
import iconPink from '../../assets/img/character/pink.png';
import iconBlue from '../../assets/img/character/skyblue.png'
import iconYellow from '../../assets/img/character/yelloweye.png'
import axiosInstance from '../../apis/axiosInstance';

const LetterTreePage = () => {
  const nickname = localStorage.getItem('username');

  const [receivedLetters, setReceivedLetters] = useState([]);
  // const receivedLetters = 5;

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

  const getLetterId = async () => {
    try {
      const response = await axiosInstance.get('/api/letters/received');
      console.log('편지 목록 id :', response);
      setReceivedLetters(response.data);
    } catch(error) {
      console.log('편지 목록 id get 실패 : ', error);
    }
  }

  const getLetterContent = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/letters/${id}`);
      console.log('편지 디테일 가져오기 성공 : ', response);
      setLetterContent(response.data);
      setColor(response.data.paperColor);
      setOpenLetter(true);
    } catch(error) {
      console.log('편지 디테일 가져오기 실패 : ', error);
    } finally {
      setLoading(false);
    }
  }
  
  // 편지 내용 부분
  const [loading,setLoading] = useState(false);
  const [openLetter, setOpenLetter] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [letterContent, setLetterContent] = useState(null);
  const [color, setColor] = useState('red');

  const letterOpen = (id) => {
    setSelectedLetter(id);
    getLetterContent(id);
  };

  const letterClose = () => {
    setLoading(false);
    setOpenLetter(false);
    setSelectedLetter(null);
    setLetterContent(null);
  }
  useEffect(() => {
    getLetterId();
  }, []);

  const getPaperColor = (color) => {
    switch (color) {
      case 'red':
        return '#ffe4e1';
    case 'blue':
        return '#e1f5fe';
    case 'yellow':
        return '#fff9c4';
    default:
        return '#ffe4e1';
    }
  };

  return (
    <div className="container letter-tree-container">
      <p className="letter-header">
        <strong>{nickname}</strong>님에게<br />
        {receivedLetters.length}개의 편지가 도착했어요!
      </p>
      <div className="tree-container">
        <img src={treeImage} alt="트리" className="tree-image" />
  
        <div className="envelope-container">
          {/* {Array.from({ length: receivedLetters }).map((_, index) => (
            <img
              key={index}
              src={envelopeImages[index % envelopeImages.length]}
              alt={`편지 ${index + 1}`}
              className={`envelope envelope-${index + 1}`}
              onClick={() => letterOpen(index)}
            />
          ))} */}
          {receivedLetters.map((id, index) => (
            <img
              key={index}
              src={envelopeImages[index % envelopeImages.length]}
              alt={`편지 ${index + 1}`}
              className={`envelope envelope-${index + 1}`}
              onClick={() => letterOpen(id)}
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
              <div className='letter' style={{ backgroundColor: getPaperColor(color) }}>
                <div className='letter-content'>
                {letterContent.content}
                </div>
                <div className='letter-bottom'>
                  <img src={
                    color === 'red' ? iconPink :
                    color === 'blue' ? iconBlue :
                    color === 'yellow' ? iconYellow :
                    iconPink
                    } 
                    alt="편지지 아이콘" 
                  />
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