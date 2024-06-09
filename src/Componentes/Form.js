// src/components/Form.js
import React, { useState } from 'react';
import { TextField, Button, IconButton, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio, Switch, Box } from '@mui/material';
import { Add as AddIcon, Clear, Delete as DeleteIcon } from '@mui/icons-material';

const Form = ({ id, removeForm }) => {
  const [questionType, setQuestionType] = useState('multipleChoice');
  const [options, setOptions] = useState(['']);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  return (
    <Box sx={{ border: '1px solid #ccc', padding: '16px', marginBottom: '16px', borderRadius: '8px', width: '600px', margin: '0 auto' }}>
      <TextField placeholder="Pergunta sem título" variant="outlined" margin="normal" style={{ width: '100%' }} />
      <FormControl variant="outlined" margin="normal" style={{ width: '100%' }}>
        <InputLabel>Tipo de Pergunta</InputLabel>
        <Select value={questionType} onChange={(e) => setQuestionType(e.target.value)} label="Tipo de Pergunta">
          <MenuItem value="multipleChoice">Múltipla Escolha</MenuItem>
          <MenuItem value="essay">Dissertativa</MenuItem>
        </Select>
      </FormControl>
      {questionType === 'multipleChoice' ? (
        <>
          <RadioGroup>
            {options.map((option, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <FormControlLabel value={option} control={<Radio color='secondary'/>} label="" />
                <TextField placeholder={`Opção ${index + 1}`} value={option} onChange={(e) => handleOptionChange(index, e.target.value)} variant="outlined" style={{ flexGrow: 1, marginRight: '8px' }} />
                <IconButton onClick={() => handleRemoveOption(index)}>
                  <Clear/>
                </IconButton>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
              <Button variant="contained" onClick={handleAddOption} startIcon={<AddIcon />} style={{ marginLeft: '8px' }} color='secondary'>
                Adicionar Opção
              </Button>
            </div>
          </RadioGroup>
        </>
      ) : (
        <TextField placeholder="Texto para resposta" variant="outlined" margin="normal" style={{ width: '100%' }}             InputProps={{
          readOnly: true,
        }}/>
      )}
      <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <FormControlLabel control={<Switch  color='secondary'/>} label="Obrigatório" />
        <IconButton onClick={() => removeForm(id)} color="secondary" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </div>
    </Box>
  );
};

export default Form;
