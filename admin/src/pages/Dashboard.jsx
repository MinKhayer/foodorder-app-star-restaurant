
import { Card, Col, Row } from 'antd';
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
  return (
    
    <div>
      
      <h3 className="mb-4">Dashboard</h3>
      <Row gutter={16}>
    <Col span={8}>
      <Card title="Total Food Item " className='shadow-md border bg-gray-400 hover:bg-white '  bordered={false}>
        6
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total Orders " className='shadow-md border bg-orange-300 hover:bg-white' bordered={false}>
        2
      </Card>
    </Col>
    <Col span={8}>
      <Card title="Total Users " className='shadow-md border bg-red-400 hover:bg-white ' bordered={false}>
        2
      </Card>
    </Col>
  </Row>
  <div>
    <DashboardChart/>
    </div>  
    </div> 
    
  )
}
function DashboardChart(){
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
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
        data: labels.map(() => Math.random()*1000),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => Math.random()*1000),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}


export default Dashboard;
