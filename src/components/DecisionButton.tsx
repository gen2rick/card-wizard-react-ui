
import React from 'react';
import { Box, Typography } from '@mui/material';

interface DecisionButtonProps {
  text: string;
  type: 'yes' | 'no';
}

const DecisionButton: React.FC<DecisionButtonProps> = ({ text, type }) => {
  const backgroundColor = type === 'yes' ? '#10b981' : '#ef4444'; // Green for yes, red for no
  
  return (
    <Box
      sx={{
        backgroundColor,
        color: 'white',
        padding: '6px 12px',
        borderRadius: '4px',
        width: '50px',
        textAlign: 'center',
        fontWeight: 'bold',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.24)',
        },
      }}
    >
      <Typography variant="body2" fontWeight="bold">
        {text}
      </Typography>
    </Box>
  );
};

export default DecisionButton;
