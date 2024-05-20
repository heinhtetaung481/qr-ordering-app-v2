// import React from 'react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import styles from "./Home.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

const Home = () => {
const [orders, setOrders] = useState<Order[]>([]);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales Analytics Chart',
    },
  },
};
    
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1000, 1500, 2000, 1800, 2500, 2200, 3000],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [500, 1200, 1800, 3000, 2000, 3200, 4000],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const fetchRecentOrders = async (): Promise<void> => {
  const apiUrl = `${process.env.REACT_APP_API_URL}/orders`;
  const response = await axios.get<Order[]>(apiUrl);
  setOrders(response.data.slice(-5));
}

useEffect(() => {
  // Fetch recent orders
  fetchRecentOrders();
}, []);

    return (
        <div>
            <div className={styles.row}>
                <div className={styles["col-md-8"]}>
                <div className={styles.card}>
                  <div className={styles["card-header"]}>Recent Orders</div>
                    <div className={styles["card-body"]}>
                        {orders.map(order => (
                            <div key={order._id} className={styles["order-item"]}>
                                <h4>Table: {order.tableNumber}</h4>
                                <p>{order.status}</p>
                            </div>
                        ))}
                    </div>
                </div>
                </div>
                <div className={styles["col-md-4"]}>
                <div className={styles.card}>
                <div className={styles["card-header"]}>Menu Management</div>
                    <div className={styles["card-body"]}>
                        <button className={styles['menu-button']}><Link to="/menus/create">Create Menu</Link></button>
                        <button className={styles['category-button']}><Link to="/category/create">Create Category</Link></button>
                    </div>
                </div>
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles["col-md-12"]}>
                <div className={styles.card}>
                  <div className={styles["card-header"]}>Sales Analytics</div>
                    <div className={styles["card-body"]}>
                      <Line options={options} data={data} />
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
