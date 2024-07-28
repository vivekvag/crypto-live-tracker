// src/App.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import io from 'socket.io-client';

const baseURL = `http://localhost:10000`;

const socket = io(baseURL);

const App: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // Replace `any[]` with your data type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/stocks/data/solana`); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // WebSocket connection
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO');
    });

    socket.on('UPDATE_DATA', (message: { type: string; data: any[] }) => {
      console.log('Received Socket.IO message:', message);
      if (message.type === 'UPDATE_DATA') {
        setData((prev) => [...message.data, ...prev.slice(0, -1)]);
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO');
    });

    return () => {
      socket.off('connect');
      socket.off('UPDATE_DATA');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className="App">
      <h1>Stock Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Symbol:</strong> {item.symbol}, <strong>Price:</strong> {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
