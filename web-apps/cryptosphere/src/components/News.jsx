import React, { useState } from 'react'
import { Select, Row, Col, Typography, Avatar, Card } from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text, Title } = Typography
const { Option } = Select

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12})
  const { data } = useGetCryptosQuery(100)

  if (!cryptoNews) return 'Loading...'

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
          >
            <Option value='Cryptocurrency'>All</Option>
            {data?.data?.coins.map(coin => <Option value={coin.symbol}>{coin.name}</Option>)}
          </Select>
        </Col>
        )}

        {cryptoNews.value.map((news,i) => (
          <Col key={i} xs={24} sm={12} lg={8}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank'>
                <div className="news-image-container">
                  <Title className='news-title' level={4}>{news.name}</Title>
                  <img style={{maxWidth: '200px', maxHeight: '100px'}} src={news?.image?.thumbnail?.contentUrl} alt="" />
                </div>
                <p>
                  {news.description > 100 ? `${news.description.substring(0, 100)}` : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl} />
                    <Text className='provider-name'>{news.provider[0]?.name}</Text>

                  </div>
                    <Text className=''>{moment(news.datePublished).startOf('ss').fromNow()}</Text>

                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
  )
}

export default News