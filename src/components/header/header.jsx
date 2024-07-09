import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../utils/imgs/logo.svg';
import separateLine from '../../utils/imgs/icons/line.svg';
import userImg from '../../utils/imgs/avatar.svg';
import { getUser, logout } from '../../utils/utils';
import { getUserInfo } from '../../redux/user-info';
import loadingImg from '../../utils/imgs/loader1.gif';
import burgerIcon from '../../utils/imgs/icons/burder.svg';
import closeIcon from '../../utils/imgs/icons/close-icon.svg';
import footerLogo from '../../utils/imgs/logo2.svg';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {isLoading, info} = useSelector(state => state.userInfo);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleClick = () => {
        logout();
        setMobileMenuOpen(false);
        navigate('/login');
    }

    const handleLogin = () => {
        setMobileMenuOpen(false);
        navigate('/login');
    }

    useEffect(() => {
        if (getUser()) {
            dispatch(getUserInfo(getUser()))
        }
    }, [getUser()])

  return (
    <header className={isMobileMenuOpen ? 'open' : ''}>
        <NavLink to='/'>
            <img src={isMobileMenuOpen ? footerLogo : logoImg} alt='logo' className='logo'/>
        </NavLink>
        <section className={`nav-bar ${isMobileMenuOpen ? 'open' : ''}`}>
            <NavLink to='/'>Главная</NavLink>
            <NavLink to='/tariffs'>Тарифы</NavLink>
            <NavLink to='/fqa'>FAQ</NavLink>
        </section>
        {getUser() && (
            <section className={`user-info ${isMobileMenuOpen ? 'open' : ''}`}>
                {isLoading ? (
                    <img src={loadingImg} alt='loading' className='loading-img'/>
                ) : (
                    <>
                        <div className='used-company-count'>
                            <p>Использовано компаний</p>
                            <h4>{info.usedCompanyCount}</h4>
                        </div>
                        <div className='company-limit'>
                            <p>Лимит по компаниям</p>
                            <h3>{info.companyLimit}</h3>
                        </div>
                    </>
                )}
            </section>
        )}
        <section className={`user-section ${isMobileMenuOpen ? 'open' : ''}`}>
            {getUser() ? (
                <div className='user-account'>
                    <div className='user-name'>
                        <p>Алексей А.</p>
                        <button className='logout-btn' onClick={handleClick}>Выйти</button>
                    </div>
                    <img src={userImg} alt='user'/>
                </div>
            ) : (
                <>
                    <NavLink to='/registration' className='registration-btn'>Зарегистрироваться</NavLink>
                    {!isMobileMenuOpen && <img src={separateLine} alt='separate line'/>}
                    <button className='log-in-btn' onClick={handleLogin}>Войти</button>
                </>
            )}
        </section>
        <button className='mobile-menu-btn' onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
            <img src={isMobileMenuOpen ? closeIcon : burgerIcon} alt='menu icon' />
        </button>
    </header>
  )
}

export default Header