import React, { useState, FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import './AddTable.css';
import { TableData } from './Tables';


const AddTable: React.FC = () => {
  const location = useLocation();
  const editingTable = location.state as TableData;

  const [number, setNumber] = useState<string>(editingTable?.number || "");
  const [reference, setReference] = useState<string>(editingTable?.table_reference || "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    const apiUrl = `${process.env.REACT_APP_API_URL}/tables`;
    const data = {
      number,
      table_reference: reference,
    };
    if (editingTable) {
      await axios.put(`${apiUrl}/${editingTable.number}`, data);
      alert('Table updated successfully');
    }else{
      await axios.post(apiUrl, data);
      alert('Table created successfully');
    }
    // redirect to tables page
    window.location.href = '/tables';
  };

  return (
    <div className="container">
      <h2 className="create-title">Create New Table</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="number" className="form-label">Number:</label>
          <input
            type="text"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="form-input"
            placeholder="Enter Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reference" className="form-label">Table Reference:</label>
          <input
            type="text"
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="form-input"
            placeholder="Enter Table Reference"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default AddTable;
