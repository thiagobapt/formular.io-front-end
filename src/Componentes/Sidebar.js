// src/components/Sidebar.js
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Box, Typography, Divider, IconButton } from '@mui/material';
import { AddBox, ListAlt, AssignmentTurnedIn, AccountCircle, ExitToApp, Menu as MenuIcon, ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 60,
          boxSizing: 'border-box',
          backgroundColor: 'lavender',
          transition: 'width 0.3s',
          overflowX: 'hidden',
          borderRadius: '0 10px 10px 0'
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
        {open && (
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, textAlign: 'center' }}>
            Formulário
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        <ListItem button onClick={() => navigate('/create')}>
          <ListItemIcon>
            <AddBox />
          </ListItemIcon>
          {open && <ListItemText primary="Criar Formulário" />}
        </ListItem>
        <ListItem button onClick={() => navigate('/my-forms')}>
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          {open && <ListItemText primary="Meus Formulários" />}
        </ListItem>
        <ListItem button onClick={() => navigate('/answered-forms')}>
          <ListItemIcon>
            <AssignmentTurnedIn />
          </ListItemIcon>
          {open && <ListItemText primary="Formulários Respondidos" />}
        </ListItem>
      </List>
      <Box sx={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Button startIcon={<AccountCircle />} fullWidth>
          {open && "Perfil"}
        </Button>
        <Button startIcon={<ExitToApp />} fullWidth onClick={() => console.log('Redirecionando...')}>
          {open && "Sair"}
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
