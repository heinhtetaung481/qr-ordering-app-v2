import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import QRCode from 'qrcode.react';
import './ViewTable.css';
import { TableData } from './Tables';

interface Order {
    id: number;
    productName: string;
    status: string;
    // Add other properties as needed
  }

const fetchTableData = async (id: string|undefined): Promise<TableData> => {
    if (!id) {
        return {} as TableData;
    }
    const apiUrl = `${process.env.REACT_APP_API_URL}/tables/${id}`;
    const response = await axios.get<TableData>(apiUrl);
    return response.data;
}

const ViewTable: React.FC = () => {
    const [tableData, setTableData] = useState<TableData>();
    const { id } = useParams<{ id: string }>();

    // Fetch Table data
    useEffect(() =>{
       fetchTableData(id).then((data) => {
           setTableData(data);
       });
    })

  const orders: Order[] = [
    { id: 1, productName: "Order 1", status: "active" },
    { id: 2, productName: "Order 2", status: "checked" },
    // Add more sample orders as needed
  ];

  return (
    <div className="table-detail-container">
      <div className="table-info">
        <h2 className='title'>Table Detail</h2>
        <div className="table-row">
          <div className="label">Table ID:</div>
          <div className="value">{tableData?.number}</div>
        </div>
        <div className="table-row">
          <div className="label">Reference Name:</div>
          <div className="value">{tableData?.table_reference}</div>
        </div>
      </div>
      <div className="qr-code-section">
        <h3>QR Code</h3>
        <div className="qr-code">
          <QRCode value={`${window.location.origin}/cart?table=${tableData?.number}`} />
        </div>
      </div>
      <div className="orders-section">
        <h3>Orders</h3>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-item">
              <div className='order-name'>{order.productName}:</div>
              <div className={order.status === "active" ? 'status-active': 'status-checked'}>{order.status}</div>
              {/* Add other order details as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTable;