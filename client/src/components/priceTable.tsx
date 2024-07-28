import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPrices } from '../redux/actions/priceActions';
import {
  fetchPricesFailure,
  fetchPricesRequest,
  fetchPricesSuccess,
  setSymbol
} from '../redux/reducers/priceReducer';
import { RootState, AppDispatch } from '../redux/store';
import io from 'socket.io-client';
import './priceTable.css';

const api_url = 'https://crypto-live-tracker-flame.vercel.app/';

const socket = io(api_url);

const PriceTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, loading, error, symbol } = useSelector((state: RootState) => state.prices);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [prevFirstRow, setPrevFirstRow] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchPrices(symbol));
  }, [dispatch, symbol]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO');
    });

    socket.on('UPDATE_DATA', (message: { type: string; data: any[] }) => {
      if (message.type === 'UPDATE_DATA') {
        dispatch(fetchPricesRequest());
        try {
          let newData = message.data.filter((item) => item.symbol === symbol);
          dispatch(fetchPricesSuccess([...newData, ...data.slice(0, -1)]));
          if (data.length > 0 && newData.length > 0) {
            const newFirstRow = newData[0];
            if (prevFirstRow && prevFirstRow.price !== newFirstRow.price) {
              setPrevFirstRow(newFirstRow);
            }
          }
        } catch (error: any) {
          dispatch(fetchPricesFailure(error?.message));
        }
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
  }, [dispatch, symbol, data, prevFirstRow]);

  const handleSymbolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSymbol(e.target.value));
    setModalIsOpen(false);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">
          <span className="symbol">{symbol.toUpperCase()}</span> Live Tracker
        </h1>
        <button className="button-change" onClick={() => setModalIsOpen(true)}>
          Change Symbol
        </button>
      </header>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <table className="price-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Time</th>
            <th>Price (USD)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((price, index) => (
            <tr
              key={price.timestamp}
              className={`${
                index === 0 && prevFirstRow && price.price !== prevFirstRow.price ? 'highlight' : ''
              }`}
            >
              <td>{index + 1}</td>
              <td>{new Date(price.timestamp).toLocaleTimeString()}</td>
              <td>${price.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalIsOpen && (
        <div className="modal-overlay" onClick={() => setModalIsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Change Symbol</h2>
            <select className="modal-select" onChange={handleSymbolChange} value={symbol}>
              <option value="bitcoin">BTC</option>
              <option value="ethereum">ETH</option>
              <option value="solana">SOL</option>
              <option value="tether">Tether</option>
              <option value="bnb">BNB</option>
            </select>
            <button className="modal-close" onClick={() => setModalIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTable;
