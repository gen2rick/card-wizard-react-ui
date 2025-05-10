
import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import CardTypeSelector from './CardTypeSelector';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

/**
 * @typedef {import('../types/flowTypes').CardTypeOption} CardTypeOption
 * 
 * @param {Object} props
 * @param {number} props.top
 * @param {number} props.left
 * @param {(cardType: CardTypeOption) => void} props.onAddCard
 */
const AddCardButton = ({ top, left, onAddCard }) => {
  const [open, setOpen] = useState(false);

  const handleAddCard = (cardType) => {
    onAddCard(cardType);
    setOpen(false);
  };

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
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <IconButton
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
        </PopoverTrigger>
        <PopoverContent className="p-0 w-auto border-none shadow-lg">
          <CardTypeSelector onSelect={handleAddCard} onClose={() => setOpen(false)} />
        </PopoverContent>
      </Popover>
    </Box>
  );
};

export default AddCardButton;
