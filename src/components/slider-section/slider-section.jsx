import React from 'react';
import ResponsiveSlider from './slider';
import { sliderData } from '../../utils/slider-data';

const SliderSection = () => {  
  return (
    <section className='slider-section'>
        <h2>Почему именно мы</h2>
        <ResponsiveSlider data={sliderData}/>
    </section>
  )
}

export default SliderSection