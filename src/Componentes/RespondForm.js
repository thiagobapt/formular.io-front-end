import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, RadioGroup, FormControlLabel, Radio, Button, Modal } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RespondForm = () => {
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const getDadosForm = async () => {
    try {
      const response = await axios.get("http://localhost:3000/question/form/" + localStorage.getItem("form_id"));

      if (response.data && response.data.length > 0) {
        setFormTitle(response.data[0].form.form_name);

        const questionsData = response.data.map(item => {
          if (item.question_body.questionType === 'MULTIPLE-CHOICE') {
            return {
              question_id: item.question_id,
              title: item.question_body.title,
              questionType: item.question_body.questionType,
              choices: item.question_body.choices[0],
              answer: ''
            };
          } else {
            return {
              question_id: item.question_id,
              title: item.question_body.title,
              questionType: item.question_body.questionType,
              answer: ''
            };
          }
        });

        setQuestions(questionsData);
      }
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  useEffect(() => {
    getDadosForm();
  }, []);

  const handleOptionSelect = (questionId, value) => {
    setSelectedChoices(prevState => ({
      ...prevState,
      [questionId]: value
    }));
  };

  const handleAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async () => {
    for (const question of questions) {
      const answerData = {
        user_id: localStorage.getItem("user_id"), // Deixe vazio ou preencha conforme necessário
        form_id: localStorage.getItem("form_id"),
        question_id: question.question_id,
        answer: question.questionType === 'MULTIPLE-CHOICE' ? selectedChoices[question.question_id] || '' : question.answer
      };

      try {
        await axios.post('http://localhost:3000/answer', answerData);
      } catch (error) {
        console.error("Erro ao enviar formulário: ", error);
        return;
      }
    }
    setModalOpen(true);
    setTimeout(() => {
      setModalOpen(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h4" align="center" color="white" sx={{ flexGrow: 1 }}>
          Formular.io
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          placeholder="Formulário sem título"
          variant="outlined"
          margin="normal"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          style={{ backgroundColor: 'white', borderRadius: '8px', width: '600px', margin: '0 auto', marginBottom: '32px', marginTop: '20px' }}
          InputProps={{ readOnly: true }}
        />
        {questions.map((question, questionIndex) => (
          <Box key={questionIndex} sx={{ width: '600px', marginBottom: '16px' }}>
            <Typography variant="h6">{question.title}</Typography>
            {question.questionType === 'MULTIPLE-CHOICE' ? (
              <RadioGroup
                value={selectedChoices[question.question_id] || ''}
                onChange={(e) => handleOptionSelect(question.question_id, e.target.value)}
              >
                {question.choices.map((choice, choiceIndex) => (
                  <FormControlLabel
                    key={choiceIndex}
                    value={choice}
                    control={<Radio color='secondary' />}
                    label={choice}
                  />
                ))}
              </RadioGroup>
            ) : (
              <TextField
                placeholder="Texto para resposta"
                variant="outlined"
                margin="normal"
                style={{ width: '100%' }}
                value={question.answer}
                onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
              />
            )}
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ backgroundColor: '#7e57c2', color: 'white', marginTop: '16px' }}
        >
          Enviar
        </Button>
      </Box>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', textAlign: 'center' }}>
        <Typography variant="h6" align="center" color="white">
          © Formular.io
        </Typography>
      </Box>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '16px', borderRadius: '8px', boxShadow: 24 }}>
          <Typography variant="h6" align="center">
            Formulário Respondido
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default RespondForm;
