import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';

import {
  Navbar,
  Footer,
  Exchanges,
  News,
  Cryptocurrencies,
  CryptoDetails,
  Homepage,
} from './components/index';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <div className="nav-bar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route element={<Homepage />} path="/" />
              <Route element={<Exchanges />} path="/exchanges" />
              <Route
                element={<Cryptocurrencies simplified={false} />}
                path="/cryptocurrencies"
              />
              <Route element={<CryptoDetails />} path="/crypto/:coinId" />
              <Route element={<News />} path="/news" />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}
          >
            Cryptosphere <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/">Exchanges</Link>
            <Link to="/">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
