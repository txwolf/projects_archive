import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
import { Col, Row, Typography } from 'antd'

const { Title } = Typography


const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  console.log('coinHistory', coinHistory)
  const coinPrice = []
  const coinTimestamp = []

  if (!coinHistory) return 'Loading...'

  for (let i = coinHistory?.data?.history?.length-1; i > 0; i--) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = coinHistory?.data?.history?.length-1; i > 0; i--) {
    const timestamp = new Date(coinHistory?.data?.history[i].timestamp * 1000)
    coinTimestamp.push(timestamp.toDateString());
  }
  
  Chart.register(...registerables);

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Title className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-price'>Current {coinName} price: {currentPrice}</Title>
        </Col>
      </Row>
      
      <Line data={data} options={options} />

     
    </>
  )
}

export default LineChart