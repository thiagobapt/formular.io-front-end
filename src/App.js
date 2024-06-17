// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Componentes/Sidebar';
import MainForm from './Componentes/MainForm';
import MyForms from './Pages/MyForms';
import FormDetail from './Pages/FormDetail';
import AnsweredForms from './Pages/AnsweredForms';
import FormularIO from './Componentes/FormularIO';
import RespondForm from './Componentes/RespondForm';
import Profile from './Componentes/Profile';
import Register from './Componentes/Register';
import LoginScreen from './Componentes/LoginScreen'; // Certifique-se de ter este componente criado
import ForgotPassword from './Componentes/ForgotPassword';
import CodeForgotPassword from './Componentes/CodeForgotPassword';
import NewPassword from './Componentes/NewPassword';
import MyFormsCreated from './Componentes/MyFormCreated';

function App() {
  return (
      <Routes>
        <Route path="/formular-io" element={<FormularIO />} />
        <Route path="/respond-form/:id" element={<RespondForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/code-forgot-password" element={<CodeForgotPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route
          path="*"
          element={
            <div style={{ display: 'flex' }}>
              <Sidebar />
              <main style={{ flexGrow: 1, padding: '16px' }}>
                <Routes>
                  <Route path="/create" element={<MainForm />} />
                  <Route path="/my-forms" element={<MyForms />} />
                  <Route path="/form/:id" element={<FormDetail />} />
                  <Route path="/answered-forms" element={<AnsweredForms />} />
                  <Route path="/" element={<MainForm />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/myformcreated/:id" element={<FormDetail/>} />
                </Routes>
              </main>
            </div>
          }
        />
      </Routes>
  );
}

export default App;
