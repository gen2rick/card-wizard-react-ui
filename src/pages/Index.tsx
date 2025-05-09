
import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Flowchart from '../components/Flowchart';
import { flowchartData } from '../data/flowchartData';

const Index = () => {
  return (
    <Container maxWidth={false} sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Email Campaign Flow Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This flowchart represents the steps in an email marketing campaign triggered by product purchases
        </Typography>
      </Box>
      
      <Box sx={{ width: '100%', minHeight: '80vh', position: 'relative' }}>
        <Flowchart data={flowchartData} />
      </Box>
    </Container>
  );
};

export default Index;
