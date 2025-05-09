
import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import { CardType, RemoveCardFunction } from '../types/flowTypes';
import { X } from 'lucide-react';

interface FlowchartCardProps {
  card: CardType;
  style?: React.CSSProperties;
  onRemove?: RemoveCardFunction;
}

const FlowchartCard: React.FC<FlowchartCardProps> = ({ card, style, onRemove }) => {
  let borderColor = '#ddd';
  let leftBorderColor = '#ddd';
  let backgroundColor = '#fff';

  // Determine the card type and set colors accordingly
  switch (card.type) {
    case 'trigger':
      borderColor = '#ef5350';
      leftBorderColor = '#1e3a8a';
      backgroundColor = '#f8fafc';
      break;
    case 'condition':
      borderColor = '#7e57c2';
      leftBorderColor = '#7e57c2';
      backgroundColor = '#f5f3ff';
      break;
    case 'action':
      borderColor = '#ef5350';
      leftBorderColor = '#f9a825';
      backgroundColor = '#fffbeb';
      break;
    case 'email':
      borderColor = '#ef5350';
      leftBorderColor = '#26c6da';
      backgroundColor = '#ecfeff';
      break;
    default:
      break;
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(card.id);
    }
  };

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
        backgroundColor,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          transform: 'translateY(-2px)'
        },
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
      <Box sx={{ pl: 2, width: '100%', pr: 4 }}>
        <Typography variant="body1" component="div">
          {card.text}
        </Typography>
      </Box>
      {onRemove && card.type !== 'trigger' && (
        <Box
          sx={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            cursor: 'pointer',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.05)',
            },
          }}
          onClick={handleRemove}
        >
          <X size={16} />
        </Box>
      )}
    </Card>
  );
};

export default FlowchartCard;
