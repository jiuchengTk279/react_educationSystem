// 能发送异步ajax请求的函数模块
// 封装axios库
// 函数的返回值是promise对象
// 1. 优化1: 统一处理请求异常?
//     在外层包一个自己创建的promise对象
//     在请求出错时, 不reject(error), 而是显示错误提示
// 2. 优化2: 异步得到不是reponse, 而是response.data
//    在请求成功resolve时: resolve(response.data)

import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if (type === 'GET') { // 发送 GET 请求
        return axios.get(url, { // 配置对象
            params: data // 指定请求参数
        })
    } else {  // 发送 POST 请求
        return axios.post(url, data)
    }
}


// 请求登陆接口
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// 添加用户
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()
