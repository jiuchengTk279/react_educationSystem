// 要求: 能根据接口文档定义接口请求
// 包含应用中所有接口请求函数的模块
// 每个函数的返回值都是promise

// 基本要求: 能根据接口文档定义接口请求函数

import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''


// 登录
// export function reqLogin(username, password) {
//     return ajax('/login', {username, password}, 'POST')
// }
export const regLogin = (username, password) => ajax(BASE + '/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')
