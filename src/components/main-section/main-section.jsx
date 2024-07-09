import React from 'react';
import { useNavigate } from 'react-router-dom';
import mainSectionImg from '../../utils/imgs/img1.svg';
import MainButton from '../buttons/main-btn';
import { getUser } from '../../utils/utils';

const MainSection = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/search');
    };

  return (
    <section className='main-section'>
        <div className='text-container'>
            <h1>Cервис по поиску<br/>публикаций<br/>о компании<br/>по его ИНН</h1>
            <p>Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.</p>
            {getUser() && (
                <MainButton styling={'main-section-btn'} onClick={handleClick}>Запросить данные</MainButton>
            )}
        </div>
        <div className='img-div'>
            <div className="main-img-rectangle"></div>
            <img className='main-img' src={mainSectionImg} alt='main-img'/>
        </div>
    </section>
  )
}

export default MainSection