
import React from 'react';
import { Box } from '@mui/material';

interface ConnectionProps {
  top: number;
  left: number;
  width: number;
  height: number;
  direction: 'vertical' | 'horizontal';
}

const ConnectionLine: React.FC<ConnectionProps> = ({ top, left, width, height, direction }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`,
        width: direction === 'horizontal' ? `${width}px` : '2px',
        height: direction === 'vertical' ? `${height}px` : '2px',
        backgroundColor: '#ccc',
        zIndex: 0,
      }}
    />
  );
};

export default ConnectionLine;
