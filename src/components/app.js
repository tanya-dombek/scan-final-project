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

const routes = [
  { path: "/", element: <Content /> },
  { path: "/login", element: <OnlyUnAuth component={<Login />} /> },
  { path: "/search", element: <OnlyAuth component={<SearchPage />} /> },
  { path: "/result", element: <OnlyAuth component={<ResultPage />} /> },
];

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
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
