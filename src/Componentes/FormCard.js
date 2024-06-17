
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ListAlt as ListAltIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FormCard = ({ title, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/myformcreated/${id}`);
  };

  return (
    <Card
      sx={{ width: 200, margin: '16px', padding: '16px', cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <ListAltIcon sx={{ fontSize: 64, color: '#7e57c2' }} />
          <Typography variant="h6" component="div" sx={{ marginTop: '8px', textAlign: 'center' }}>
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCard;
