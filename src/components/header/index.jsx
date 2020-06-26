import React, { Component } from 'react'
import { formateDate } from '../../utils/dateUtils'
import memoryUtills from '../../utils/memoryUtills'
import storageUtils from '../../utils/storageUtils'
import { reqWeather } from '../../api'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd'
import LinkButton from '../link-button'
import './index.less'

// 左侧导航组件头部
class Header extends Component {

    // state 初始化数据
    state = {
        // 当前的时间字符串
        currentTime: formateDate(new Now()),
        // 天气图片 url
        dayPictureUrl: '', 
        // 天气的文本
        weather: ''
    }

    // 获取时间
    getTime = () => {
        // 每隔1s获取当前时间, 并更新状态数据currentTime, 定时器
        this.intervalId =  setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        }, 1000)
    }

    // 获取天气
    getWeather = async () => {
        // 调用接口请求异步获取数据
        const { dayPictureUrl, weather } = await reqWeather('北京')
        // 更新状态
        this.setState({ dayPictureUrl, weather })
    }

    // 获取导航标题
    getTitle = () => {
        // 得到当前的请求路径
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            // 如果当前item对象的key与path一样,item的title就是需要显示的title
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                // 在所有的子 item 中查找匹配的
                const cItem = item.children.find(cItem => cItem.key === path)
                // 如果有值才说明有匹配的
                if (cItem) {
                    // 取出它的 title
                    title = cItem.title
                }
            }
        })
        return title
    }


    // 退出登录
    logout = () => {
        Modal.confirm({
            content: '确定退出吗？',
            onOk: () => {
                console.log('OK', this)
                // 删除保存的 user 数据
                storageUtils.removeUser()
                memoryUtills.user = {}

                // 跳转到 login
                this.props.histroy.replace('/login')
            }
        })
    }




    // 第一次 render() 之后执行一次
    // 一般在此执行异步操作: 发ajax请求/启动定时器
    componentDidMount () {
        // 获取当前的时间
        this.getTime()
        // 获取当前的天气
        this.getWeather()
    }


    // // 不能这么做: 不会更新显示
    // componentWillMount () {
    //     this.title = this.getTitle()
    // }

    // 在当前组件卸载之前使用
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.intervalId)
    }


    render () {

        // 得到所需要的天气相关信息
        const { currentTime, dayPictureUrl, weather } = this.state
        // 得到当前需要显示的 用户名
        const username = memoryUtills.user.username
        // 得到需要显示的 title
        const title = this.getTitle()

        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <LinkButton href="javascript:" onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"></img>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)