import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../../App';
import Game from '../../pages/Game';
import Main from '../../pages/Main';
import NotFound from '../../pages/NotFound';

const RouterComponent: React.FC = () => {

  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route index element={<Main />} />
      <Route path="game/:gameId" element={<Game />} />
      <Route path="not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RouterComponent;
