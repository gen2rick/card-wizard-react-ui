
import React from 'react';
import { Box, Typography } from '@mui/material';
import { CardTypeOption } from '../types/flowTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface CardTypeSelectorProps {
  onSelect: (type: CardTypeOption) => void;
  onClose: () => void;
}

const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({ onSelect, onClose }) => {
  const [selectedType, setSelectedType] = React.useState<CardTypeOption>('action');

  const handleSelect = () => {
    onSelect(selectedType);
  };

  return (
    <Box className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 w-64">
      <Box className="flex justify-between items-center mb-3">
        <Typography variant="h6" className="text-base font-medium">Add new card</Typography>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </Box>
      
      <Box className="mb-4">
        <Select
          defaultValue={selectedType}
          onValueChange={(value) => setSelectedType(value as CardTypeOption)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select card type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="action">Action</SelectItem>
            <SelectItem value="condition">Condition</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="trigger">Trigger</SelectItem>
          </SelectContent>
        </Select>
      </Box>
      
      <Button className="w-full" onClick={handleSelect}>
        Add Card
      </Button>
    </Box>
  );
};

export default CardTypeSelector;
