// create a component to show the list of orders and group them by table number and show the active order first
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Order.module.css';

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

const fetchOrders = async (): Promise<Order[]> => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/orders`;
    const response = await axios.get<Order[]>(apiUrl);
    return response.data;
}

const Order: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() =>{
        fetchOrders().then((data) => {
            setOrders(data);
        });
    }, [])

    const confirmOrder = async (orderId: string) => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/orders/${orderId}`;
        await axios.put(apiUrl, { status: 'confirmed' });
        // update the order status
        setOrders(orders.map(order => {
            if (order._id === orderId) {
                return { ...order, status: 'confirmed' };
            }
            return order;
        }));
        alert('Order completed successfully');
        fetchOrders();
    }

    // Group orders by table number
    const ordersByTable = orders.reduce((acc, order) => {
        (acc[order.tableNumber] = acc[order.tableNumber] || []).push(order);
        return acc;
    }, {} as Record<string, Order[]>);

    return (
        <div className={styles["order-container"]}>
            <h2 className={styles.title}>Orders</h2>
            <div className={styles["order-wrapper"]}>
                {Object.entries(ordersByTable).map(([tableNumber, orders]) => (
                    <div key={tableNumber}>
                        <h3 className={styles.table}>Table : {tableNumber}</h3>
                        <div className={styles["order-items"]}>
                            {orders.map(order => (
                                <div key={order._id} className={styles["order-item"]}>
                                    <h4 className={styles["order-id"]}>Order ID: {
                                        order._id.slice(-5)
                                    }</h4>
                                    <h4 className={styles["order-status"]}>Status: {order.status}</h4>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.itemId}>{item.itemId} x {item.quantity}</li>
                                        ))}
                                    </ul>
                                    <div className={styles["order-actions"]}>
                                        {order.status === 'confirmed' ? null : <button className={styles["confirm-button"]} onClick={() => confirmOrder(order._id)}>Confirm</button>}
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Order;
