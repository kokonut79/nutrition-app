import React from 'react';
import Login from './Components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register/Register'
import Main from './Components/Main/Main';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/register" element={<Register />}>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;