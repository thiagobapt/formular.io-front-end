import React, { useState } from 'react';
import { TextField, Button, Box, Modal, Typography } from '@mui/material';
import { Add as AddIcon, ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import Form from './Form';
import { CreateFormApi } from '../integracoes/CreateFormAPI';
import { CreatequestionsAPI } from '../integracoes/CreatequestionsAPI';

const MainForm = () => {
  const [forms, setForms] = useState([{ id: 1 }]);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [TitleForms, setTitleForms] = useState('');

  const handleAddForm = () => {
    const newId = forms.length + 1;
    setForms([...forms, { id: newId }]);
  };

  const handleRemoveForm = (id) => {
    setForms(forms.filter(form => form.id !== id));
    const newFormData = { ...formData };
    delete newFormData[id];
    setFormData(newFormData);
  };

  const updateFormData = (id, data) => {
    setFormData(prevData => ({ ...prevData, [id]: data }));
  };

  const handleOpenModal = async () => {
    try {
      const user_id = localStorage.getItem("user_id");

      if (user_id) {
        await CreateFormApi(user_id, TitleForms);
        for (const id in formData) {
          const { questionType, options, questionTitle } = formData[id];
          await CreatequestionsAPI(localStorage.getItem("form_id"), questionType, questionTitle, options);
        }
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Erro durante o login:", error.response.data.message);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("http://localhost:3001/respond-form/" + localStorage.getItem("form_id"));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', position: 'relative' }}>
      <TextField
        placeholder="Formulário sem título"
        variant="outlined"
        margin="normal"
        value={TitleForms}
        onChange={(e) => setTitleForms(e.target.value)}
        style={{ backgroundColor: 'white', borderRadius: '8px', width: '600px', margin: '0 auto', marginBottom: '32px' }}
      />
      {forms.map((form, index) => (
        <Box key={form.id} sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: index !== forms.length - 1 ? '32px' : '0' }}>
          <Form id={form.id} removeForm={handleRemoveForm} updateFormData={updateFormData} />
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
        Salvar
      </Button>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '700px',
            height: '150px',
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
            value={"http://localhost:3001/respond-form/" + localStorage.getItem("form_id")}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#7e57c2',
              position: 'absolute',
              bottom: '10px',
              right: '16px',
              fontSize: '12px',
              padding: '8px 12px',
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
