import React from 'react';
import MainSection from '../main-section/main-section';
import SliderSection from '../slider-section/slider-section';
import sliderImg from '../../utils/imgs/img2.svg';
import TariffSection from '../tariffs-section/tariff-section';

const Content = () => {
  return (
    <main>
        <MainSection />
        <SliderSection />
        <img className='content-img' src={sliderImg} alt='big'/>
        <TariffSection />
    </main>
  )
}

export default Content