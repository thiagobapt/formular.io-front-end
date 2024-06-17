import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
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

      const token = response.data?.access_token;
      if (token) {
        // Armazena o token no localStorage
        localStorage.setItem("token", response.data.access_token);
        // Envia uma mensagem para o console com o valor do token armazenado
        console.log("Token armazenado:", localStorage.getItem("token"));
      } else {
        // Lança um erro se o token não estiver presente na resposta
        throw new Error("Token não encontrado na resposta");
      }
    }
    catch (error) {
      console.log("Erro durante o login:", error.response.data.message);
    }
    
  }
  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        <LoginBox>
          <Typography variant="h4" fontFamily={'sans-serif'} fontWeight={'bold'} color={'secondary'}  gutterBottom>
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
