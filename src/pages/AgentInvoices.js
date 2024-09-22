import React, { useState } from 'react';
import axios from 'axios';

const AgentInvoices = () => {
  const [trackingCode, setTrackingCode] = useState(''); // Для хранения трек-кода
  const [selectedStatus, setSelectedStatus] = useState(''); // Для хранения выбранного статуса

  const handleSubmit = async () => {
    try {
      const response = await axios.put('https://loho-app-5ca1033b0269.herokuapp.com/api/invoices/update-status', {
        trackingCode: trackingCode, // Трек-код инвойса
        newStatus: selectedStatus   // Новый статус
      });

      console.log('Status updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={trackingCode}
        onChange={(e) => setTrackingCode(e.target.value)}
        placeholder="Enter Tracking Code"
      />

      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <option value="">Select Status</option>
        <option value="In Warehouse">In Warehouse</option>
        <option value="In Airplane">In Airplane</option>
        <option value="Delivered">Delivered</option>
        {/* Добавьте другие статусы при необходимости */}
      </select>

      <button onClick={handleSubmit}>Update Status</button>
    </div>
  );
};

export default AgentInvoices;
