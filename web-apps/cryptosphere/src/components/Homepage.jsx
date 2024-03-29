import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import {Cryptocurrencies, News} from '../components/index'
import Exchanges from './Exchanges'


const { Title } = Typography


const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if(isFetching) return 'Loading...'

  return (<>
    <Title level={2} className='heading'>Global Crypto Stats</Title>
    <Row>
      <Col span={12}><Statistic title='Total Cryptocurrencies' value={globalStats.total}></Statistic></Col>
            <Col span={12}><Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges)}></Statistic></Col>
      <Col span={12}><Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap)}></Statistic></Col>
      <Col span={12}><Statistic title='Total Markets' value={millify(globalStats.totalMarkets)}></Statistic></Col>
      <Col span={12}><Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume)}></Statistic></Col>
    </Row>
    <div className="home-heading-container">
      <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
      <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
    </div>
    <Cryptocurrencies simplified={true}/>
    <div className="home-heading-container">
      <Title level={2} className='home-title'>Latest Crypto News</Title>
      <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
    </div>
    <News simplified />
    <div className="home-heading-container">
      <Title level={2} className='home-title'>Top Exchanges</Title>
      <Title level={3} className='show-more'><Link to='/exchanges'>Show More</Link></Title>
    </div>
    <Exchanges simplified={true} />
  </>)
}

export default Homepage
