import { WebSocketServer } from 'ws';  

export const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
      console.log('Received message:', message);
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
    });

    ws.send('Welcome to the WebSocket server!');
  });
};
