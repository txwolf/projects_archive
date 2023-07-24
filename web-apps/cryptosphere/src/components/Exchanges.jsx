import React from 'react'
import { useGetCryptoExchangesQuery } from '../services/cryptoApi'
import { Col, Row, Collapse, Avatar, Typography} from 'antd'
import millify from 'millify';
import HTMLReactParser from 'html-react-parser';

const { Panel } = Collapse;
const { Text } = Typography;



const Exchanges = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptoExchangesQuery(count)

  if(isFetching) return 'Loading...'

  console.log(data.data.exchanges[0])

  return (
    <>
    <Row>
      <Col span={6}>Exchanges</Col>
      <Col span={6}>24H Volume</Col>
      <Col span={6}>Markets</Col>
      <Col span={6}>BTC Price</Col>
    </Row>
      <Row>
        {data?.data?.exchanges.map(
          exchange => (
            <Col key={exchange.uuid} span={24}>
              <Collapse>
                <Panel showArrow={false} header={(
                  <Row key={exchange.uuid} className='exchanges-row'>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>{millify(exchange['24hVolume'])}</Col>
                    <Col span={6}>{exchange.numberOfMarkets}</Col>
                    <Col span={6}>{exchange.name}</Col>
                  </Row>
                )} key={exchange.uuid}>

                  INFO

                </Panel>
              </Collapse>
            </Col>
          )
        )}
      </Row>
     
      </>
  )
}

export default Exchanges