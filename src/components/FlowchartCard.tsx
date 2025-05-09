
import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { CardType } from '../types/flowTypes';

interface FlowchartCardProps {
  card: CardType;
  style?: React.CSSProperties;
}

const FlowchartCard: React.FC<FlowchartCardProps> = ({ card, style }) => {
  let borderColor = '#ddd';
  let leftBorderColor = '#ddd';

  // Determine the card type and set colors accordingly
  switch (card.type) {
    case 'trigger':
      borderColor = '#ef5350';
      leftBorderColor = '#1e3a8a';
      break;
    case 'condition':
      borderColor = '#7e57c2';
      leftBorderColor = '#7e57c2';
      break;
    case 'action':
      borderColor = '#ef5350';
      leftBorderColor = '#f9a825';
      break;
    case 'email':
      borderColor = '#ef5350';
      leftBorderColor = '#26c6da';
      break;
    default:
      break;
  }

  return (
    <Card
      sx={{
        position: 'relative',
        width: '300px',
        minHeight: '60px',
        borderRadius: '4px',
        border: `1px solid ${borderColor}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        display: 'flex',
        padding: '12px',
        backgroundColor: '#fff',
        ...style,
        '&::before': {
          content: '""',
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          backgroundColor: leftBorderColor,
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        }
      }}
    >
      <Box sx={{ pl: 2, width: '100%' }}>
        <Typography variant="body1" component="div">
          {card.text}
        </Typography>
      </Box>
    </Card>
  );
};

export default FlowchartCard;
