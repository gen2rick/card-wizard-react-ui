
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import CanvasFlowchart from '../components/CanvasFlowchart';
import { flowchartData as initialFlowchartData } from '../data/flowchartData';

const Index = () => {
  const [flowData, setFlowData] = useState(initialFlowchartData);

  const handleDataChange = (newData) => {
    setFlowData(newData);
  };

  return (
    <Container maxWidth={false} sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Email Campaign Flow Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This flowchart represents the steps in an email marketing campaign triggered by product purchases.
          Drag cards to reposition them in the flow.
        </Typography>
      </Box>
      
      <Box sx={{ width: '100%', minHeight: '80vh', position: 'relative', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
        <CanvasFlowchart data={flowData} onDataChange={handleDataChange} />
      </Box>
    </Container>
  );
};

export default Index;
