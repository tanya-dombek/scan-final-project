import React, {useEffect, useState} from 'react';
import MainButton from '../buttons/main-btn';
import { getUser } from '../../utils/utils';

const TariffCard = ({tariff}) => {
    const isBusiness = tariff.title.toLowerCase() === 'business';
    const [currentTariff, setCurrentTariff] = useState(false);

    useEffect(() => {
        if (getUser()) {
            setCurrentTariff(true);
        } else {
            setCurrentTariff(false);
        }
    }, [getUser()])

  return (
    <div className='tariff-card'>
        <div className={'header ' + tariff.title.toLowerCase()}>
            <div className='header-text'>
                <h3 className={isBusiness ? 'white-text' : ''}>{tariff.title}</h3>
                <img src={tariff.img} alt='tariff'/>
            </div>
            <p className={isBusiness ? 'white-text' : ''}>{tariff.description}</p>
        </div>
        <div className={'main ' + (tariff.currentTariff && currentTariff ? 'current-tariff' : '')}>
            {(tariff.currentTariff && currentTariff) && (
                <div className='current-tariff-tag'>Текущий тариф</div>
            )}
            <div className='price'>
                <span className='regular-price'>{tariff.price} ₽</span>
                <span className='sail-price'>{tariff.sailPrice} ₽</span>
            </div>
            <p>или {tariff.instalment} ₽/мес. при рассрочке на 24 мес.</p>
            <h4 className="ul-header">В тариф входит:</h4>
            <ul>
                {tariff.benefits.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <MainButton  styling={tariff.currentTariff && currentTariff ? 'current-tariff-btn' : 'tariff'}>
                {tariff.currentTariff && currentTariff ? 'Перейти в личный кабинет' : 'Подробнее'}
            </MainButton>
        </div>

    </div>
  )
}

export default TariffCard