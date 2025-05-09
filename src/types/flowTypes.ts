
export interface CardType {
  id: number;
  type: 'trigger' | 'condition' | 'action' | 'email';
  text: string;
  position: {
    x: number;
    y: number;
  };
  next?: number[];
  yes?: number;
  no?: number;
}

export interface Connection {
  id: string;
  from: number;
  to: number;
  points: {
    x: number;
    y: number;
  }[];
  type: 'next' | 'yes' | 'no';
}

export interface FlowchartData {
  nodes: CardType[];
  connections: Connection[];
}
