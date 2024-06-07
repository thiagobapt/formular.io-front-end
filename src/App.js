import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './Componentes/Sidebar';
import MainForm from './Componentes/MainForm';


const App = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Sidebar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <MainForm/>
      </Box>
    </Box>
  );
};

export default App;
