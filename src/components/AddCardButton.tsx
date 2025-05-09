
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';

interface AddCardButtonProps {
  top: number;
  left: number;
  onClick: () => void;
}

const AddCardButton: React.FC<AddCardButtonProps> = ({ top, left, onClick }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        transform: 'translate(-50%, -50%)',
        zIndex: 3,
      }}
    >
      <IconButton
        onClick={onClick}
        sx={{
          backgroundColor: '#ffffff',
          border: '2px solid #ccc',
          width: '24px',
          height: '24px',
          '&:hover': {
            backgroundColor: '#f0f0f0',
            borderColor: '#999',
          },
        }}
        size="small"
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default AddCardButton;
