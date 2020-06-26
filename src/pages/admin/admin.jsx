import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtills from '../../utils/memoryUtills'
import { Layout } from 'antd';
import Header from '../../components/header/index'
import LeftNav from '../../components/left-nav/index'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Header, Footer, Sider, Content } = Layout;

// 后台管理的路由组件
export default class Admin extends Component {
    render () {

        const user = memoryUtills.user
        // 如果 user 不存在或者没有 user_id，那么都重定向到 login 页面中
        if (!user || !user._id) {
            return <Redirect to='/login' />
        }

        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: 20, backgroundColor: '#fff'}}>
                        {/* 使用 Switch，只能跳转其中的一个路由，如果找不到就重定向到首页路由 */}
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/category' component={Category}></Route>
                            <Route path='/product' component={Product}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/charts/bar' component={Bar}></Route>
                            <Route path='/charts/line' component={Line}></Route>
                            <Route path='/charts/pie' component={Pie}></Route>
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center', color: '#ccc'}}>推荐使用谷歌浏览器，可以获得更好的使用体验</Footer>
                </Layout>
            </Layout>
        )
    }
}