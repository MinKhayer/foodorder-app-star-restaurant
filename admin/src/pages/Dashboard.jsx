import { useEffect, useState } from 'react'
import axios from "axios"
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {

  const [foodItem, setFoodItem] = useState([]);
  const [, setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    axios.get(`/foods`)
      .then((res) => {
        setLoading(false)
        setFoodItem(res.data)
        // console.log(res.data.data)
      })
  }, []);
  const totalFoodItem = foodItem.length;




  const [order, setOrder] = useState([]);
  useEffect(() => {
    setLoading(true)
    axios.get(`/admin/orders`)
      .then((res) => {
        setLoading(false);
        setOrder(res.data.data)
        // setOrder(res.data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);


  const totalOrders = order.length;

  const [user, setUser] = useState([]);
  useEffect(() => {
    setLoading(true)
    axios.get(`/admin/users`)
      .then((res) => {
        setLoading(false)
        setUser(res.data.data)
        // console.log(res.data.data)
      })
  }, []);


  const totalUsers = user.length;
  //console.log(totalUsers);

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <Row gutter={16}>
        <Col span={8}>
          <Link to="/foods">
            <Card
              title="Total Food Item"
              className="shadow-md border bg-gray-400 hover:bg-white cursor-pointer"
              bordered={false}
            >
              {totalFoodItem}
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/orders">
            <Card
              title="Total Orders"
              className="shadow-md border bg-orange-300 hover:bg-white cursor-pointer"
              bordered={false}
            >
              {totalOrders}
            </Card>
          </Link>
        </Col>
        <Col span={8}>
          <Link to="/users">
            <Card
              title="Total Users"
              className="shadow-md border bg-red-400 hover:bg-white cursor-pointer"
              bordered={false}
            >
              {totalUsers}
            </Card>
          </Link>
        </Col>
      </Row>
      <div>
        <DashboardChart />
      </div>
    </div>
  );
};

function DashboardChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.random() * 1000),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}

export default Dashboard;
