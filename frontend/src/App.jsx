import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from './pages/introPage';
import CreateAccount from './pages/CreateAccount';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path='/' element={<IntroPage/>}></Route>
            <Route path='/registration' element={<CreateAccount/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;