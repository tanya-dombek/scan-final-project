import React from 'react';
import footerLogo from '../../utils/imgs/logo2.svg';

const Footer = () => {
  return (
    <footer>
        <div className='footer-container'>
            <img src={footerLogo} alt='logo'/>
            <div>
                <p>г. Москва, Цветной б-р, 40<br/>+7 495 771 21 11<br/>info@skan.ru</p>
                <p>Copyright. 2022</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer