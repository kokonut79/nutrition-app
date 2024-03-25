import React from 'react';
import Login from './Components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Components/Register/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />}>
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;