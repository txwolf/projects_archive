import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'
import millify from 'millify'
import { useState, useEffect } from 'react'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    setCryptos(data?.data?.coins.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [data, searchTerm])

  // if (searchTerm) {
  //   setCryptos(cryptos.filter(crypto => crypto.name.toLowerCase().includes(searchTerm.toLowerCase())))
  // }

  if(isFetching) return 'Loading...'

  return (
    <>
      {!simplified &&
        <div className="search-crypto">
          <Input placeholder='Search Cryptocurreny' onChange={(e) => setSearchTerm(e.target.value)} />
        </div>}
      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map(currency => (
          <Col key={currency.uuid} xs={24} sm={12} lg={6} className='crypto-card'>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card hoverable title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} alt='img'/>}>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                                                <p>Daily Change: {millify(currency.change)}%</p>


              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies