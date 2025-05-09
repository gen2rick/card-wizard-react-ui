
import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import FlowchartCard from './FlowchartCard';
import DecisionButton from './DecisionButton';
import ConnectionLine from './ConnectionLine';
import ConnectionDot from './ConnectionDot';
import { FlowchartData, Connection } from '../types/flowTypes';

interface FlowchartProps {
  data: FlowchartData;
}

const Flowchart: React.FC<FlowchartProps> = ({ data }) => {
  const [connections, setConnections] = useState<any[]>([]);

  useEffect(() => {
    // Generate connections based on the node relationships
    const generatedConnections: any[] = [];
    
    data.nodes.forEach(node => {
      // Process 'next' connections
      if (node.next && node.next.length > 0) {
        node.next.forEach(nextId => {
          const nextNode = data.nodes.find(n => n.id === nextId);
          if (nextNode) {
            generatedConnections.push({
              id: `${node.id}-next-${nextId}`,
              from: node.id,
              to: nextId,
              fromPos: { x: node.position.x + 150, y: node.position.y + 60 },
              toPos: { x: nextNode.position.x + 150, y: nextNode.position.y },
              type: 'next'
            });
          }
        });
      }
      
      // Process 'yes' connections
      if (node.yes) {
        const yesNode = data.nodes.find(n => n.id === node.yes);
        if (yesNode) {
          generatedConnections.push({
            id: `${node.id}-yes-${node.yes}`,
            from: node.id,
            to: node.yes,
            fromPos: { x: node.position.x + 100, y: node.position.y + 60 },
            toPos: { x: yesNode.position.x + 150, y: yesNode.position.y },
            type: 'yes'
          });
        }
      }
      
      // Process 'no' connections
      if (node.no) {
        const noNode = data.nodes.find(n => n.id === node.no);
        if (noNode) {
          generatedConnections.push({
            id: `${node.id}-no-${node.no}`,
            from: node.id,
            to: node.no,
            fromPos: { x: node.position.x + 200, y: node.position.y + 60 },
            toPos: { x: noNode.position.x + 150, y: noNode.position.y },
            type: 'no'
          });
        }
      }
    });
    
    setConnections(generatedConnections);
  }, [data]);

  // Render connection lines and dots
  const renderConnections = () => {
    const elements: JSX.Element[] = [];
    
    connections.forEach(conn => {
      // For simplicity, just draw straight lines
      // In a real application, you'd need more complex path calculation
      
      // Draw vertical line down from source
      elements.push(
        <ConnectionLine
          key={`${conn.id}-down`}
          top={conn.fromPos.y}
          left={conn.fromPos.x}
          width={2}
          height={Math.abs(conn.toPos.y - conn.fromPos.y) / 2}
          direction="vertical"
        />
      );
      
      // Draw horizontal line if needed
      if (conn.fromPos.x !== conn.toPos.x) {
        elements.push(
          <ConnectionLine
            key={`${conn.id}-across`}
            top={conn.fromPos.y + Math.abs(conn.toPos.y - conn.fromPos.y) / 2}
            left={Math.min(conn.fromPos.x, conn.toPos.x)}
            width={Math.abs(conn.toPos.x - conn.fromPos.x)}
            height={2}
            direction="horizontal"
          />
        );
      }
      
      // Draw vertical line to target
      elements.push(
        <ConnectionLine
          key={`${conn.id}-up`}
          top={conn.fromPos.y + Math.abs(conn.toPos.y - conn.fromPos.y) / 2}
          left={conn.toPos.x}
          width={2}
          height={Math.abs(conn.toPos.y - conn.fromPos.y) / 2}
          direction="vertical"
        />
      );
      
      // Add connection dots
      elements.push(
        <ConnectionDot key={`${conn.id}-from-dot`} top={conn.fromPos.y} left={conn.fromPos.x} />
      );
      elements.push(
        <ConnectionDot key={`${conn.id}-to-dot`} top={conn.toPos.y} left={conn.toPos.x} />
      );
      
      // Add yes/no buttons for condition nodes
      if (conn.type === 'yes') {
        const buttonY = conn.fromPos.y + Math.abs(conn.toPos.y - conn.fromPos.y) / 4;
        const buttonX = conn.fromPos.x - 30;
        
        elements.push(
          <Box key={`${conn.id}-yes-button`} sx={{ position: 'absolute', top: buttonY, left: buttonX }}>
            <DecisionButton text="Yes" type="yes" />
          </Box>
        );
      } else if (conn.type === 'no') {
        const buttonY = conn.fromPos.y + Math.abs(conn.toPos.y - conn.fromPos.y) / 4;
        const buttonX = conn.fromPos.x - 30;
        
        elements.push(
          <Box key={`${conn.id}-no-button`} sx={{ position: 'absolute', top: buttonY, left: buttonX }}>
            <DecisionButton text="No" type="no" />
          </Box>
        );
      }
    });
    
    return elements;
  };

  return (
    <Paper 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: 'auto', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
        overflow: 'auto'
      }}
    >
      {/* Render the connections */}
      {renderConnections()}
      
      {/* Render the cards */}
      {data.nodes.map(node => (
        <Box 
          key={node.id} 
          sx={{ 
            position: 'absolute', 
            top: node.position.y, 
            left: node.position.x,
            zIndex: 2
          }}
        >
          <FlowchartCard card={node} />
        </Box>
      ))}
    </Paper>
  );
};

export default Flowchart;
