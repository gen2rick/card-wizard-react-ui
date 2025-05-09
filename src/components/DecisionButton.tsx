
import React from 'react';
import { Box, Typography } from '@mui/material';

interface DecisionButtonProps {
  text: string;
  type: 'yes' | 'no';
}

const DecisionButton: React.FC<DecisionButtonProps> = ({ text, type }) => {
  const backgroundColor = type === 'yes' ? '#2e7d32' : '#d32f2f';
  
  return (
    <Box
      sx={{
        backgroundColor,
        color: 'white',
        padding: '8px 16px',
        borderRadius: '4px',
        width: '60px',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {text}
      </Typography>
    </Box>
  );
};

export default DecisionButton;
