import React, { useState } from 'react';
import axios from 'axios';

const Status = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]); // Для хранения данных статуса

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://loho-app-5ca1033b0269.herokuapp.com/api/invoices/${trackingCode}`);
      setStatus(response.data.status);

      // Добавляем новые данные в таблицу
      setData(prevData => [
        ...prevData,
        {
          trackingCode: trackingCode,
          status: response.data.status
        }
      ]);

    } catch (err) {
      setError('Ошибка при поиске по трек-коду');
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Проверка статуса по трек-коду</h1>
      <input
        type="text"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
        placeholder="Введите трек-код"
        style={styles.input}
      />
      <button onClick={handleSearch} style={styles.button}>Поиск</button>

      {loading && <p>Загрузка...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {data.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Трек-код</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.trackingCode}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    margin: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    backgroundColor: '#007bff',
    color: 'white',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default Status;
