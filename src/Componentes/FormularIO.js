import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';

const FormularIO = () => {
  const [formTitle, setFormTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedChoices, setSelectedChoices] = useState({});


  const handleAnswerChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answer = value;
    setQuestions(newQuestions);
  };

  const getDadosForm = async () => {
    try {
      const response = await axios.get("http://localhost:3000/answer/form/" + localStorage.getItem("form_id"));

      if (response.data && response.data.length > 0) {
        setFormTitle(response.data[0].form.form_name);

        const questionsData = response.data.map(item => {
          if (item.question.question_body.questionType === 'MULTIPLE-CHOICE') {
            return {
              question_id: item.question_id,
              title: item.question.question_body.title,
              questionType: item.question.question_body.questionType,
              choices: item.question.question_body.choices[0],
              answer: item.answer
            };
          } else {
            return {
              question_id: item.question_id,
              title: item.question.question_body.title,
              questionType: item.question.question_body.questionType,
              answer: item.answer
            };
          }
        });

        const initialSelectedChoices = questionsData.reduce((acc, question) => {
          if (question.questionType === 'MULTIPLE-CHOICE') {
            acc[question.question_id] = question.answer;
          }
          return acc;
        }, {});

        setQuestions(questionsData);
        setSelectedChoices(initialSelectedChoices);
      }
    } catch (error) {
      console.log("Erro: ", error);
    }
  };

  useEffect(() => {
    getDadosForm();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', textAlign: 'center' }}>
        <Typography variant="h4" align="center" color="white">
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
                inputProps={{readOnly: true}}
              />
            )}
          </Box>
        ))}
      </Box>
      <Box sx={{ backgroundColor: '#7e57c2', padding: '16px', textAlign: 'center' }}>
        <Typography variant="h6" align="center" color="white">
          © Formular.io
        </Typography>
      </Box>
    </Box>
  );
};

export default FormularIO;
