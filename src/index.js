// 入口 js

import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';

import App from './App';

// 将 App 组件标签渲染到 index 页面的 div 上
ReactDom.render( <App />, document.getElementById('root') )