
import React, { useState, useRef } from 'react';
import { Card, Typography, Box } from '@mui/material';
import { X } from 'lucide-react';

/**
 * @param {Object} props
 * @param {import('../types/flowTypes').CardType} props.card
 * @param {Object} [props.style]
 * @param {import('../types/flowTypes').RemoveCardFunction} [props.onRemove]
 * @param {function} [props.onDragStart]
 * @param {function} [props.onDrag]
 * @param {function} [props.onDragEnd]
 */
const FlowchartCard = ({ card, style, onRemove, onDragStart, onDrag, onDragEnd }) => {
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

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

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(card.id);
    }
  };

  const handleMouseDown = (e) => {
    if (card.type === 'trigger') return; // Don't allow dragging the trigger card
    
    const rect = cardRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    
    setIsDragging(true);
    
    if (onDragStart) {
      onDragStart(card.id);
    }
    
    // Add event listeners for drag and drop
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const containerRect = cardRef.current.parentElement.parentElement.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffset.current.x;
    const newY = e.clientY - containerRect.top - dragOffset.current.y;
    
    if (onDrag) {
      onDrag(card.id, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    
    if (onDragEnd) {
      onDragEnd(card.id);
    }
    
    // Remove event listeners
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <Card
      ref={cardRef}
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
        transition: isDragging ? 'none' : 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
          transform: isDragging ? 'none' : 'translateY(-2px)',
          cursor: card.type === 'trigger' ? 'default' : 'move'
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
        },
        opacity: isDragging ? 0.8 : 1,
        zIndex: isDragging ? 1000 : 2
      }}
      onMouseDown={handleMouseDown}
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
