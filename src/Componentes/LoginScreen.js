import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const GradientBackground = styled(Box)(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'linear-gradient(to bottom, #D3CCE3, #E9E4F0)',
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

  const handleValidate = () => {
    // Adicione sua lógica de validação aqui
    alert(`Email: ${email}\nSenha: ${password}`);
  };

  const handleSignUp = () => {
    // Redirecione para a tela de cadastro
    alert('Redirecionando para a tela de cadastro...');
  };

  const handleForgotPassword = () => {
    // Redirecione para a tela de recuperação de senha
    alert('Redirecionando para a tela de recuperação de senha...');
  };

  return (
    <ThemeProvider theme={theme}>
      <GradientBackground>
        <LoginBox>
          <Typography variant="h5" gutterBottom>
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
            <Button variant="contained" color="primary" fullWidth onClick={handleValidate}>
              Validar
            </Button>
          </Box>
          <Box mt={2}>
            <Button variant="text" color="secondary" fullWidth onClick={handleSignUp}>
              Cadastro
            </Button>
          </Box>
          <Box mt={2}>
            <Button variant="text" color="secondary" fullWidth onClick={handleForgotPassword}>
              Esqueci a Senha
            </Button>
          </Box>
        </LoginBox>
      </GradientBackground>
    </ThemeProvider>
  );
};

export default LoginScreen;