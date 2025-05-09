
import React, { useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import FlowchartCard from './FlowchartCard';
import DecisionButton from './DecisionButton';
import ConnectionLine from './ConnectionLine';
import ConnectionDot from './ConnectionDot';
import AddCardButton from './AddCardButton';
import { FlowchartData, Connection, AddCardFunction, CardType } from '../types/flowTypes';

interface FlowchartProps {
  data: FlowchartData;
}

const Flowchart: React.FC<FlowchartProps> = ({ data }) => {
  const [flowchartData, setFlowchartData] = useState<FlowchartData>(data);
  const [connections, setConnections] = useState<any[]>([]);

  useEffect(() => {
    // Generate connections based on the node relationships
    const generatedConnections: any[] = [];
    
    flowchartData.nodes.forEach(node => {
      // Process 'next' connections
      if (node.next && node.next.length > 0) {
        node.next.forEach(nextId => {
          const nextNode = flowchartData.nodes.find(n => n.id === nextId);
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
      } else if (node.next && node.next.length === 0) {
        // Add a connection endpoint for nodes with empty next array
        generatedConnections.push({
          id: `${node.id}-next-endpoint`,
          from: node.id,
          to: null,
          fromPos: { x: node.position.x + 150, y: node.position.y + 60 },
          toPos: { x: node.position.x + 150, y: node.position.y + 120 },
          type: 'next',
          isEndpoint: true
        });
      }
      
      // Process 'yes' connections
      if (node.yes) {
        const yesNode = flowchartData.nodes.find(n => n.id === node.yes);
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
      } else if (node.type === 'condition' && !node.yes) {
        // Add a connection endpoint for condition nodes without yes connection
        generatedConnections.push({
          id: `${node.id}-yes-endpoint`,
          from: node.id,
          to: null,
          fromPos: { x: node.position.x + 100, y: node.position.y + 60 },
          toPos: { x: node.position.x + 50, y: node.position.y + 120 },
          type: 'yes',
          isEndpoint: true
        });
      }
      
      // Process 'no' connections
      if (node.no) {
        const noNode = flowchartData.nodes.find(n => n.id === node.no);
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
      } else if (node.type === 'condition' && !node.no) {
        // Add a connection endpoint for condition nodes without no connection
        generatedConnections.push({
          id: `${node.id}-no-endpoint`,
          from: node.id,
          to: null,
          fromPos: { x: node.position.x + 200, y: node.position.y + 60 },
          toPos: { x: node.position.x + 250, y: node.position.y + 120 },
          type: 'no',
          isEndpoint: true
        });
      }
    });
    
    setConnections(generatedConnections);
  }, [flowchartData]);

  // Add a new card when the + button is clicked
  const handleAddCard: AddCardFunction = (sourceCardId, connectionType, position) => {
    // Generate a new ID (just max id + 1 for simplicity)
    const newId = Math.max(...flowchartData.nodes.map(node => node.id)) + 1;
    
    // Determine the new card type (default to 'action')
    let newCardType: 'trigger' | 'condition' | 'action' | 'email' = 'action';
    // For condition nodes, we'll add email nodes
    if (connectionType === 'yes' || connectionType === 'no') {
      newCardType = 'email';
    }

    // Create the new card
    const newCard: CardType = {
      id: newId,
      type: newCardType,
      text: `New ${newCardType} card`,
      position: {
        x: position.x - 150, // Center the card at the endpoint
        y: position.y + 20 // Add a small offset
      },
      next: []
    };

    // Update the source card to point to the new card
    const updatedNodes = flowchartData.nodes.map(node => {
      if (node.id === sourceCardId) {
        if (connectionType === 'next') {
          return {
            ...node,
            next: [...(node.next || []), newId]
          };
        } else if (connectionType === 'yes') {
          return {
            ...node,
            yes: newId
          };
        } else if (connectionType === 'no') {
          return {
            ...node,
            no: newId
          };
        }
      }
      return node;
    });

    // Update the flowchart data
    setFlowchartData({
      nodes: [...updatedNodes, newCard],
      connections: flowchartData.connections
    });
  };

  // Render connection lines and dots
  const renderConnections = () => {
    const elements: JSX.Element[] = [];
    
    connections.forEach(conn => {
      // For endpoints (connections without a target node), render an add button
      if (conn.isEndpoint) {
        // Draw vertical line down
        elements.push(
          <ConnectionLine
            key={`${conn.id}-down`}
            top={conn.fromPos.y}
            left={conn.fromPos.x}
            width={2}
            height={Math.abs(conn.toPos.y - conn.fromPos.y)}
            direction="vertical"
          />
        );
        
        // Add the + button at the endpoint
        elements.push(
          <AddCardButton
            key={`${conn.id}-add-button`}
            top={conn.toPos.y}
            left={conn.toPos.x}
            onClick={() => handleAddCard(conn.from, conn.type, conn.toPos)}
          />
        );
        return;
      }
      
      // For regular connections, just draw straight lines
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
      {flowchartData.nodes.map(node => (
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
