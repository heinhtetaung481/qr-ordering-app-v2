import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import QRCode from 'qrcode.react';
import styles from './ViewTable.module.css';
import { TableData } from './Tables';

export interface OrderItem {
    itemId: string;
    quantity: number;
}
export interface Order {
    _id: string;
    tableNumber: string;
    items: Array<OrderItem>;
    status: string;
    name?: string;
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
    const [orders, setOrders] = useState<Order[]>([]);
    const { id } = useParams<{ id: string }>();

    // Fetch Table data
    useEffect(() =>{
       fetchTableData(id).then((data) => {
           setTableData(data);
       });
    })

    // Fetch Orders for the table
    useEffect(() =>{
        const fetchOrders = async (): Promise<void> => {
            const apiUrl = `${process.env.REACT_APP_API_URL}/orders?tableNumber=${id}`;
            const response = await axios.get<Order[]>(apiUrl);
            setOrders(response.data);
        }
        fetchOrders();
    }, [id])

  return (
    <div className={styles["table-detail-container"]}>
      <div className={styles["table-info"]}>
        <h2 className={styles.title}>Table Detail</h2>
        <div className={styles["table-row"]}>
          <div className={styles.label}>Table ID:</div>
          <div className={styles.value}>{tableData?.number}</div>
        </div>
        <div className={styles["table-row"]}>
          <div className={styles.label}>Reference Name:</div>
          <div className={styles.value}>{tableData?.table_reference}</div>
        </div>
      </div>
      <div className={styles["qr-code-section"]}>
        <h3>QR Code</h3>
        <div className={styles["qr-code"]}>
          <QRCode value={`${window.location.origin}/cart?table=${tableData?.number}`} />
        </div>
      </div>
      <div className={styles["orders-section"]}>
        <h3>Orders</h3>
        <div className={styles["orders-list"]}>
          {orders.map(order => (
            <div key={order._id} className={styles["order-item"]}>
              <div className={styles['order-name']}>{order._id.slice(-5)}:</div>
              <div className={order.status === "confirmed" ? styles['status-active']: styles['status-checked']}>{order.status}</div>
              <ul>
                    {order.items.map(item => (
                        <li key={item.itemId}>{item.itemId} x {item.quantity}</li>
                    ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewTable;