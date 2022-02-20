import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css';
import { BrowserRouter } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';


import { ConfigProvider } from 'antd';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider >
        <App />
      </ConfigProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);
