import React from 'react';
import { tariffData } from '../../utils/tariff-data';
import TariffCard from './tariff-card';

const TariffSection = () => {
  return (
    <section className='tariff-section'>
        <h2>Наши тарифы</h2>
        <div className='tariff-card-container'>
          {tariffData.map((item) => (
            <TariffCard key={item.title} tariff={item}/>
          ))}
        </div>
    </section>
  )
}

export default TariffSection