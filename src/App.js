// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Componentes/Sidebar';
import MainForm from './Componentes/MainForm';
import MyForms from './Pages/MyForms';
import FormDetail from './Pages/FormDetail';
import AnsweredForms from './Pages/AnsweredForms';

function App() {
  return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '16px' }}>
          <Routes>
            <Route path="/create" element={<MainForm />} />
            <Route path="/my-forms" element={<MyForms />} />
            <Route path="/form/:id" element={<FormDetail />} />
            <Route path="/answered-forms" element={<AnsweredForms />} />
            <Route path="/" element={<MainForm />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
