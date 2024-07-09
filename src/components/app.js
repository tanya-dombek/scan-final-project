import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './header/header';
import Content from './content/content';
import Footer from './footer/footer';
import Login from './login/login-page';
import SearchPage from './search/search-page';
import { OnlyAuth, OnlyUnAuth } from './protected-route';
import ResultPage from './result/result-page';
import { getUser, logout } from '../utils/utils';


function App() {
  useEffect(() => {
    const expireDateString = localStorage.getItem('expire');
    const expireDate = new Date(expireDateString);
    const today = new Date();

    if (expireDate < today) {
      logout();
    }
  }, [getUser()]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/login" element={<OnlyUnAuth component={<Login />}/>} />
        <Route path="/search" element={<OnlyAuth component={<SearchPage />}/>} />
        <Route path="/result" element={<OnlyAuth component={<ResultPage />}/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
