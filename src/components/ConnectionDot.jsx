
import React from 'react';
import { Box } from '@mui/material';

/**
 * @param {Object} props
 * @param {number} props.top
 * @param {number} props.left
 */
const ConnectionDot = ({ top, left }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: '2px solid #6366f1', // Indigo color for better visibility
        zIndex: 3,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.2s ease-in-out, background-color 0.2s ease-in-out',
        '&:hover': {
          transform: 'translate(-50%, -50%) scale(1.2)',
          backgroundColor: '#6366f1',
        }
      }}
    />
  );
};

export default ConnectionDot;
