import React from 'react';
import { useNavigate } from 'react-router-dom';
import treeImage from '../../assets/img/letter/tree.svg'; 
import envelopePink from '../../assets/img/letter/pinkletter.svg'; 
import envelopeBlue from '../../assets/img/letter/blueletter.svg';
import envelopePurple from '../../assets/img/letter/purpleletter.svg'; 
import envelopeYellow from '../../assets/img/letter/yellowletter.svg'; 

const LetterTreePage = () => {
  const navigate = useNavigate();


  const nickname = 'Guest';
  const receivedLetters = 5;


  const envelopeImages = [
    envelopePink,
    envelopeYellow,
    envelopeBlue,
    envelopePink,
    envelopePurple,
  ]; 


  const handleLetterClick = (index) => {
    navigate('/letterRead', { state: { letterIndex: index } });
  };

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
              onClick={() => handleLetterClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LetterTreePage
