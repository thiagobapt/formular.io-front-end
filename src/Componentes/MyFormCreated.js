import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Modal, Typography } from '@mui/material';
import { Add as AddIcon, ContentCopy as ContentCopyIcon } from '@mui/icons-material';
import axios from 'axios';
import Myformcreatedform from './MyFormCreatedForm';
import { CreateFormApi } from '../integracoes/CreateFormAPI';
import { CreatequestionsAPI } from '../integracoes/CreatequestionsAPI';
import { UpdateFormApi } from '../integracoes/UpdateFormAPI';
import { UpdatequestionsAPI } from '../integracoes/UpdatequestionsAPI';

const Myformcreated = () => {
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [TitleForms, setTitleForms] = useState('');
  const [userName, setUserName] = useState('');
  const [openResponseModal, setOpenResponseModal] = useState(false);

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const form_id = localStorage.getItem("form_id");
        if (form_id) {
          const response = await axios.get(`http://localhost:3000/form/${form_id}`);
          const formDetails = response.data;

          setTitleForms(formDetails.form_name);

          const initialForms = formDetails.question.map((question, index) => ({
            id: index + 1,
            questionType: question.question_body.questionType === "MULTIPLE-CHOICE" ? "multipleChoice" : "essay",
            options: question.question_body.choices ? question.question_body.choices[0] : [''],
            questionTitle: question.question_body.title
          }));

          setForms(initialForms);

          const initialFormData = {};
          formDetails.question.forEach((question, index) => {
            initialFormData[index + 1] = {
              questionType: question.question_body.questionType === "MULTIPLE-CHOICE" ? "multipleChoice" : "essay",
              options: question.question_body.choices ? question.question_body.choices[0] : [''],
              questionTitle: question.question_body.title
            };
          });

          setFormData(initialFormData);
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do formulário:", error);
      }
    };

    fetchFormData();
  }, []);

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
        await UpdateFormApi(user_id, TitleForms);
        for(const id in formData){
          const { questionType, options, questionTitle } = formData[id];
          await UpdatequestionsAPI(localStorage.getItem("question_id"), questionType, questionTitle, options);
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

  const handleFetchUserName = async () => {
    try {
      const form_id = localStorage.getItem("form_id");
      const response = await axios.get(`http://localhost:3000/answer/form/${form_id}`);
      const answers = response.data;

      console.log(answers);

      if (answers.length > 0) {
        setUserName(answers[0].user.user_name);
      } else {
        setUserName('No answers found');
      }

      setOpenResponseModal(true);
    } catch (error) {
      console.error("Erro ao buscar as respostas:", error);
    }
  };

  const handleCloseResponseModal = () => {
    setOpenResponseModal(false);
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
          <Myformcreatedform
            id={form.id}
            removeForm={handleRemoveForm}
            updateFormData={updateFormData}
            questionType={form.questionType}
            options={form.options}
            questionTitle={form.questionTitle}
          />
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
      <Modal open={openResponseModal} onClose={handleCloseResponseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            outline: 'none'
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Nome do Usuário
          </Typography>
          <Typography variant="body1">
            {userName}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleCloseResponseModal}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Myformcreated;
