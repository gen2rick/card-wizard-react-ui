
import React from 'react';
import { Box } from '@mui/material';

interface ConnectionDotProps {
  top: number;
  left: number;
}

const ConnectionDot: React.FC<ConnectionDotProps> = ({ top, left }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '2px solid #ccc',
        zIndex: 1,
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
};

export default ConnectionDot;
