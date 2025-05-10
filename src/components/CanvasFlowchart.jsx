
import React, { useEffect, useState, useRef } from 'react';
import { Paper, Box } from '@mui/material';
import FlowchartCard from './FlowchartCard';
import DecisionButton from './DecisionButton';
import ConnectionDot from './ConnectionDot';
import AddCardButton from './AddCardButton';

/**
 * Canvas-based Flowchart component
 * @param {Object} props
 * @param {import('../types/flowTypes').FlowchartData} props.data
 * @param {Function} [props.onDataChange]
 */
const CanvasFlowchart = ({ data, onDataChange }) => {
  const [flowchartData, setFlowchartData] = useState(data);
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [draggingCardId, setDraggingCardId] = useState(null);
  const [canvasSize, setCanvasSize] = useState({ width: 2000, height: 1500 });

  // Generate connections based on the node relationships
  useEffect(() => {
    const generatedConnections = [];
    
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

    // Notify parent component of data change if callback is provided
    if (onDataChange) {
      onDataChange(flowchartData);
    }

    // Draw connections on canvas
    drawConnections(generatedConnections);
  }, [flowchartData, onDataChange]);

  // Draw connections on canvas
  const drawConnections = (connections) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up canvas styling
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    
    connections.forEach(conn => {
      ctx.beginPath();
      
      // Move to starting point
      ctx.moveTo(conn.fromPos.x, conn.fromPos.y);
      
      // For regular connections with a target
      if (!conn.isEndpoint) {
        // Calculate midpoint Y for the horizontal segment
        const midY = conn.fromPos.y + (conn.toPos.y - conn.fromPos.y) / 2;
        
        // Draw vertical line down from source
        ctx.lineTo(conn.fromPos.x, midY);
        
        // Draw horizontal line across
        ctx.lineTo(conn.toPos.x, midY);
        
        // Draw vertical line to target
        ctx.lineTo(conn.toPos.x, conn.toPos.y);
      } else {
        // For endpoints, just draw a vertical line
        ctx.lineTo(conn.toPos.x, conn.toPos.y);
      }
      
      ctx.stroke();
    });
  };

  // Handle card drag start
  const handleDragStart = (cardId) => {
    setDraggingCardId(cardId);
  };

  // Handle card dragging
  const handleDrag = (cardId, newPosition) => {
    setFlowchartData(prevData => {
      const updatedNodes = prevData.nodes.map(node => {
        if (node.id === cardId) {
          return {
            ...node,
            position: newPosition
          };
        }
        return node;
      });

      return {
        ...prevData,
        nodes: updatedNodes
      };
    });
  };

  // Handle card drag end
  const handleDragEnd = () => {
    setDraggingCardId(null);
  };

  // Add a new card when the + button is clicked
  const handleAddCard = (sourceCardId, connectionType, position, cardType) => {
    // Generate a new ID (just max id + 1 for simplicity)
    const newId = Math.max(...flowchartData.nodes.map(node => node.id)) + 1;
    
    // Create the new card
    const newCard = {
      id: newId,
      type: cardType,
      text: `New ${cardType} card`,
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

  // Remove a card
  const handleRemoveCard = (cardId) => {
    // Find which nodes reference this cardId
    const referencingNodes = flowchartData.nodes.filter(node => 
      (node.next && node.next.includes(cardId)) || 
      node.yes === cardId || 
      node.no === cardId
    );

    // Update the nodes to remove references to the removed card
    const updatedNodes = flowchartData.nodes
      .filter(node => node.id !== cardId) // Remove the card
      .map(node => {
        if (node.next && node.next.includes(cardId)) {
          // Remove cardId from the next array
          return {
            ...node,
            next: node.next.filter(id => id !== cardId)
          };
        } else if (node.yes === cardId) {
          // Remove yes reference
          const { yes, ...rest } = node;
          return rest;
        } else if (node.no === cardId) {
          // Remove no reference
          const { no, ...rest } = node;
          return rest;
        }
        return node;
      });

    // Update the flowchart data
    setFlowchartData({
      nodes: updatedNodes,
      connections: flowchartData.connections
    });
  };

  // Update canvas size based on container size
  useEffect(() => {
    if (containerRef.current) {
      const updateCanvasSize = () => {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setCanvasSize({ width: Math.max(width, 2000), height: Math.max(height, 1500) });
      };
      
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
      
      return () => {
        window.removeEventListener('resize', updateCanvasSize);
      };
    }
  }, []);

  return (
    <Paper 
      sx={{ 
        position: 'relative', 
        width: '100%', 
        height: 'auto', 
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 4,
        overflow: 'auto',
        backgroundImage: 'radial-gradient(circle at 1px 1px, #ddd 1px, transparent 0)',
        backgroundSize: '20px 20px',
      }}
      ref={containerRef}
    >
      {/* Canvas for connections */}
      <canvas 
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Connection dots and endpoints for adding cards */}
      {connections.map(conn => {
        if (conn.isEndpoint) {
          return (
            <AddCardButton
              key={`${conn.id}-add-button`}
              top={conn.toPos.y}
              left={conn.toPos.x}
              onAddCard={(cardType) => handleAddCard(conn.from, conn.type, conn.toPos, cardType)}
            />
          );
        } else {
          return (
            <React.Fragment key={conn.id}>
              <ConnectionDot key={`${conn.id}-from-dot`} top={conn.fromPos.y} left={conn.fromPos.x} />
              <ConnectionDot key={`${conn.id}-to-dot`} top={conn.toPos.y} left={conn.toPos.x} />
              
              {/* Yes/No buttons for condition nodes */}
              {conn.type === 'yes' && (
                <Box key={`${conn.id}-yes-button`} sx={{ position: 'absolute', top: conn.fromPos.y + Math.abs(conn.toPos.y - conn.fromPos.y) / 4, left: conn.fromPos.x - 30, zIndex: 2 }}>
                  <DecisionButton text="Yes" type="yes" />
                </Box>
              )}
              
              {conn.type === 'no' && (
                <Box key={`${conn.id}-no-button`} sx={{ position: 'absolute', top: conn.fromPos.y + Math.abs(conn.toPos.y - conn.fromPos.y) / 4, left: conn.fromPos.x - 30, zIndex: 2 }}>
                  <DecisionButton text="No" type="no" />
                </Box>
              )}
            </React.Fragment>
          );
        }
      })}
      
      {/* Render the cards */}
      {flowchartData.nodes.map(node => (
        <Box 
          key={node.id} 
          sx={{ 
            position: 'absolute', 
            top: node.position.y, 
            left: node.position.x,
            zIndex: node.id === draggingCardId ? 1000 : 2
          }}
        >
          <FlowchartCard 
            card={node} 
            onRemove={handleRemoveCard}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          />
        </Box>
      ))}
    </Paper>
  );
};

export default CanvasFlowchart;
