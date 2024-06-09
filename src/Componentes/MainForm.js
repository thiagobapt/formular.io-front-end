
import React, { useState } from 'react';
import { TextField, Button, Box, Modal, Typography, Switch, FormControlLabel } from '@mui/material';
import { Add as AddIcon, ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import Form from './Form';

const MainForm = () => {
  const [forms, setForms] = useState([{ id: 1 }]);
  const [openModal, setOpenModal] = useState(false);
  const [anonymousResponses, setAnonymousResponses] = useState(false);

  const handleAddForm = () => {
    setForms([...forms, { id: forms.length + 1 }]);
  };

  const handleRemoveForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleToggleAnonymousResponses = () => {
    setAnonymousResponses(!anonymousResponses);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('http://example.com/form-link');
    alert('Link copiado para a área de transferência!');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', position: 'relative' }}>
      <TextField
        placeholder="Formulário sem título"
        variant="outlined"
        margin="normal"
        style={{ backgroundColor: 'white', borderRadius: '8px', width: '600px', margin: '0 auto', marginBottom: '32px', }}
      />
      {forms.map((form, index) => (
        <Box key={form.id} sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: index !== forms.length - 1 ? '32px' : '0' }}>
          <Form id={form.id} removeForm={handleRemoveForm} />
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button variant="contained" onClick={handleAddForm} startIcon={<AddIcon />} color="secondary">
          Adicionar Formulário
        </Button>
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          backgroundColor: '#7e57c2',
          fontSize: '16px',
          padding: '12px 24px',
          ':hover': {
            backgroundColor: '#5e35b1',
          },
        }}
        onClick={handleOpenModal}
      >
        Enviar
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px', // Aumentando o tamanho do modal
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            outline: 'none'
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Enviar Formulário
          </Typography>
          <TextField
            label="Link"
            variant="outlined"
            fullWidth
            margin="normal"
            value="http://example.com/form-link"
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControlLabel
            control={<Switch checked={anonymousResponses} onChange={handleToggleAnonymousResponses} />}
            label="Permitir respostas anônimas?"
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#7e57c2',
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              fontSize: '12px', // Diminuindo o tamanho do botão
              padding: '8px 16px',
              ':hover': {
                backgroundColor: '#5e35b1',
              },
            }}
            startIcon={<ContentCopyIcon />}
            onClick={handleCopyLink}
          >
            Copiar link
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default MainForm;
