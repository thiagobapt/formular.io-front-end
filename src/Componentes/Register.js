
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [profile, setProfile] = useState({
    name: '',
    birthDate: '',
    email: '',
    password: '',
  });

  const RegisterAPI = async () =>{
    try{
      const response = await axios.post("http://localhost:3000/user",{
        user_email: profile.email,
        user_name :profile.name,
        user_password: profile.password,
        user_birthday: profile.birthDate
      });
      console.log("Login realizado com sucesso:", response.data);

      setSnackbarOpen(true);
    }

    catch (error) {
      console.error("Erro durante o login:", error.response.data.message);
    }
  }

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleRegister = () => {
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    navigate('/login');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#825DEA',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '32px',
          backgroundColor: '#7e57c2',
          color: 'white',
          width: '80%',
          maxWidth: '600px',
          textAlign: 'center',
          borderRadius: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Cadastro
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Falta pouco para ter a sua conta no Formular.io!
        </Typography>
        {['name', 'birthDate', 'email', 'password'].map((field) => (
          <Box
            key={field}
            sx={{ display: 'flex', alignItems: 'center', margin: '16px 0' }}
          >
            <Typography sx={{ flex: 1, textAlign: 'left' }}>
              {field === 'name' && 'Nome Completo'}
              {field === 'birthDate' && 'Data de nascimento'}
              {field === 'email' && 'Email'}
              {field === 'password' && 'Senha'}
            </Typography>
            <TextField
              type={field === 'birthDate' ? 'date' : field === 'password' ? 'password' : field === 'email' ? 'email' :'text'}
              value={profile[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              sx={{ flex: 2, marginRight: '8px', input: { color: 'white' },
              '& .MuiInputBase-input::placeholder': {
                color: 'white',
              },
              '& .MuiInputBase-root': {
                color: 'white',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
              }, }}
              fullWidth
            />
          </Box>
        ))}
        <Button
          variant="contained"
          color="secondary"
          onClick={RegisterAPI}
          sx={{
            backgroundColor: 'purple',
            '&:hover': {
              backgroundColor: 'darkpurple',
            },
            marginTop: '16px'
          }}
        >
          Cadastrar
        </Button>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Cadastro Realizado!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;
