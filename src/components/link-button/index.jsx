import React, { Component } from 'react'
import './index.less'

// 外形像链接的按钮
// 如果想要的是类似链接的功能，但是又不想要是链接，就可以函数封装
export default function LinkButton(props) {
    return <button {...props} className="link-button"></button>
}