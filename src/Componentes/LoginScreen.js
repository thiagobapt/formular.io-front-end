import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme();

const GradientBackground = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#825DEA',
  padding: theme.spacing(2),
}));

const LoginBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  boxShadow: theme.shadows[4],
  textAlign: 'center',
  width: '100%',
  maxWidth: '400px',
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(3),
  },
}));

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const LoginUser = async () =>{

    try{
      const response = await axios.post("http://localhost:3000/auth/login",{
        user_email: email,
        user_password: password,
      })
      console.log("Login realizado com sucesso:", response.data);
      navigate('/create');
    }
    catch (error) {
      console.error("Erro durante o login:", error.response.data.message);
    }
    
  }
  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        <LoginBox>
          <Typography variant="h4" fontFamily={'sans-serif'} gutterBottom>
            Formular.io
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="contained" color="secondary" fullWidth fontFamily={'sans-serif'}  onClick={LoginUser}>
              Entrar
            </Button>
          </Box>
          <Box mt={2}>
            <Button variant="text" color="secondary" fullWidth fontFamily={'sans-serif'} component={Link} to="/register">
              Cadastro
            </Button>
          </Box>
          <Box mt={2}>
            <Button variant="text" color="secondary" fullWidth fontFamily={'sans-serif'} component={Link} to="/forgot-password">
              Esqueci a Senha
            </Button>
          </Box>
        </LoginBox>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default LoginScreen;
