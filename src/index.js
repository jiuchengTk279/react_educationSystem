// 入口 js

import React from 'react';
import ReactDom from 'react-dom';
import 'antd/dist/antd.css';

import App from './App';
import storageUtils from './utils/storageUtils'
import memoryUtills from './utils/memoryUtills'

// 读取 local中保存的 user，保存到内存中
const user = storageUtils.getUser()
memoryUtills.user = user


// 将 App 组件标签渲染到 index 页面的 div 上
ReactDom.render( <App />, document.getElementById('root') )