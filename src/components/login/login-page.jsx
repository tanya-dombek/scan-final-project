import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import loginImg from '../../utils/imgs/characters.svg';
import MainButton from '../buttons/main-btn';
import { NavLink } from 'react-router-dom';
import googleIcon from '../../utils/imgs/google.svg';
import facebookIcon from '../../utils/imgs/facebook.svg';
import yandexIcon from '../../utils/imgs/yandex.svg';
import lockImg from '../../utils/imgs/lock.svg';
import { loginUser, resetError } from '../../redux/login';

const networkIcons = [googleIcon, facebookIcon, yandexIcon];

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoading, error} = useSelector(state => state.login);  
    const [user, setUser] = useState({login: '', password: ''})

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(user)).then((result) => {
            if (result.payload) {
                setUser({login: '', password: ''});
                navigate('/');
            }
        });
    };

    useEffect(() => {
        dispatch(resetError());

        return () => {
            dispatch(resetError());
        };
    }, [dispatch]);

  return (
    <div className='login'>
        <h1>Для оформления подписки на тариф, необходимо авторизоваться.</h1>
        <img src={loginImg} alt='login' className='login-image'/>
        <div className='authorization-card'>
            <img src={lockImg} alt='lock' className='lock-img'/>
            <div className='tabs'>
                <div className='login-tab active'>Войти</div>
                <div className='registration-tab'>Зарегистрироваться</div>
            </div>
            <p>Логин или номер телефона:</p>
            <input name={'login'} onChange={e => handleChange(e)} className={error ? 'error' : ''}/>
            {error && (<p className='error-msg'>{error}</p>)}
            <p>Пароль:</p>
            <input name={'password'} type='password' onChange={e => handleChange(e)} className={error ? 'error' : ''}/>
            {error && (<p className='error-msg'>{error}</p>)}
            <MainButton styling={'login-btn'} isDisabled={user.login === '' || user.password === ''} onClick={onSubmit}>
                {isLoading ? 'Вход в аккаунт...' : 'Войти'}
            </MainButton>
            <div className='reset-password'>
                <NavLink to='#'>Восстановить пароль</NavLink>
            </div>
            <p>Войти через:</p>
            <div className='networks'>
                {networkIcons.map((icon, index) => (
                    <div className='icon-container' key={index}>
                        <img src={icon} alt='network-icon'/>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Login