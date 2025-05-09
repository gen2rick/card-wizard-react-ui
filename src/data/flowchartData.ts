
import { FlowchartData } from '../types/flowTypes';

export const flowchartData: FlowchartData = {
  nodes: [
    {
      id: 1,
      type: 'trigger',
      text: 'When someone purchases any product',
      position: { x: 380, y: 50 },
      next: [2]
    },
    {
      id: 2,
      type: 'condition',
      text: 'Purchased a Product?',
      position: { x: 380, y: 150 },
      yes: 3,
      no: 6
    },
    {
      id: 3,
      type: 'condition',
      text: 'Filter by weather conditions in contact\'s location',
      position: { x: 250, y: 290 },
      yes: 4,
      no: 5
    },
    {
      id: 4,
      type: 'action',
      text: 'Wait a specific time interval',
      position: { x: 120, y: 430 },
      next: [7]
    },
    {
      id: 5,
      type: 'action',
      text: 'Wait a specific time interval',
      position: { x: 380, y: 430 },
      next: [8]
    },
    {
      id: 6,
      type: 'action',
      text: 'Wait a specific time interval',
      position: { x: 640, y: 290 },
      next: [9]
    },
    {
      id: 7,
      type: 'email',
      text: 'Then send email campaign',
      position: { x: 120, y: 530 },
      next: []
    },
    {
      id: 8,
      type: 'email',
      text: 'Then send email campaign',
      position: { x: 380, y: 530 },
      next: []
    },
    {
      id: 9,
      type: 'email',
      text: 'Then send email campaign',
      position: { x: 640, y: 430 },
      next: []
    }
  ],
  connections: [
    // These would normally be generated programmatically based on the nodes
    // For this example, we'll manually define the connections
  ]
};
