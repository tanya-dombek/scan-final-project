import React, { useState, useEffect } from 'react';
import loadingImg from '../../utils/imgs/loader1.gif';

const HistogramSlider = ({ data, isLoading }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [maxVisibleCards, setMaxVisibleCards] = useState(8);

  const handleLeftArrowClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleRightArrowClick = () => {
    setStartIndex((prevIndex) => Math.min(prevIndex + 1, data.length - 1));
  };

  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 650) {
        setMaxVisibleCards(1);
    } else if (width < 777) {
        setMaxVisibleCards(3);
    } else if (width < 909) {
        setMaxVisibleCards(4);
    } else if (width < 1043) {
        setMaxVisibleCards(5);
    } else if (width < 1176) {
        setMaxVisibleCards(6);
    } else if (width < 1312) {
        setMaxVisibleCards(7);
    } else {
        setMaxVisibleCards(8);
    }
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => {
      window.removeEventListener('resize', updateVisibleCards);
    };
  }, []);

  const visibleData = data.slice(startIndex, startIndex + maxVisibleCards);

  return (
    <div className='histogram-slider-container'>
        <button className='histogram-arrow left' onClick={handleLeftArrowClick} disabled={startIndex === 0}></button>
        <div className='slider-container'>
            <div className='fixed-column'>
                <p>Период</p>
                <p>Всего</p>
                <p>Риски</p>
            </div>
            {isLoading ? (
                <div className='loading'>
                    <img src={loadingImg} alt='loading'/>
                    <p>Загружаем данные</p>
                </div>
            ) : (
                <div className='histogram-slider' >
                    {visibleData.map((item, index) => (
                        <div key={index} className='histogram-card'>
                            <p>{item.date}</p>
                            <p>{item.totalDocuments}</p>
                            <p>{item.riskFactors}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <button className='histogram-arrow right' onClick={handleRightArrowClick} disabled={startIndex >= data.length - maxVisibleCards}></button>
    </div>
  );
};

export default HistogramSlider;