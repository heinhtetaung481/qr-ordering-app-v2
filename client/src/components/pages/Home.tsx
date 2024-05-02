// import React from 'react';
import './Home.css';
import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Order {
    id: number;
    customerName: string;
    totalPrice: number;
    status: string;
}

interface MenuItem {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface Props {
    recentOrders: Order[];
    menuItems: MenuItem[];
}

const Home = () => {

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

    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                <div className="card">
                  <div className="card-header">Recent Orders</div>
                    <div className="card-body">
                        {/* Render recent orders here */}
                    </div>
                </div>
                </div>
                <div className="col-md-4">
                <div className="card">
                <div className="card-header">Menu Management</div>
                    <div className="card-body">
                        {/* Render menu management options here */}
                    </div>
                </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                <div className="card">
                  <div className="card-header">Sales Analytics</div>
                    <div className="card-body">
                      <Line options={options} data={data} />
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
