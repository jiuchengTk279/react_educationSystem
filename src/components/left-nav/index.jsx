import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon} from 'antd'
import logo from '../../assets/images/logo.png'
import './index.less'
import menuList from '../../config/menuConfig'

const SubMenu = Menu.SubMenu

// 左侧导航组件
class LeftNav extends Component {

    // 根据 menu 的数据数组生成对应的标签数组
    // 使用 map + 递归调用
    // 获取标签节点的方法
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            // {
            //     title: '首页', // 菜单标题名称
            //     key: '/home', // 对应的path
            //     icon: 'home', // 图标名称
            //     children: [], // 可能有, 也可能没有
            //   }
      
            //   <Menu.Item key="/home">
            //     <Link to='/home'>
            //       <Icon type="pie-chart"/>
            //       <span>首页</span>
            //     </Link>
            //   </Menu.Item>
      
            //   <SubMenu
            //     key="sub1"
            //     title={
            //       <span>
            //         <Icon type="mail"/>
            //         <span>商品</span>
            //       </span>
            //     }
            //   >
            //     <Menu.Item/>
            //     <Menu.Item/>
            //   </SubMenu>

            // 没有 children 节点
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else { // 有 children 节点
                return (
                    <SubMenu key={item.key} title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }


    // 根据 menu 的数据数组生成对应的标签数组
    // 使用 reduce + 递归调用
    // 获取标签节点的方法
    getMenuNodes = (menuList) => {

        // 得到当前请求的路由路径
        const path = this.props.location.pathname

        return menuList.reduce((pre, item) => {
            // 向 pre 中添加 <Menu.Item>
            // 没有子列表就是 <Menu.Item>
            if (!item.children) {
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {

                // 查找一个与当前请求路径匹配的子 Item
                const cItem = item.children.find(cItem => cItem.key === path)
                // 如果存在，说明当前 item 的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }
                
                
                // 向 pre 中添加 <SubMenu>
                // 有子列表就是 <SubMenu>
                pre.push((
                    <SubMenu key={item.key} title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                    }>
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }

            return pre
        }, [])
    }

    // 在第一次 render() 之前执行一次
    // 为第一个render()准备数据(必须同步的)
    componentWillMount () {
        this.menuNodes = this.getMenuNodes(menuList)
    }


    render () {

        // 得到当前请求的路由路径
        const path = this.props.location.pathname
        // 得到需要打开菜单项的 key
        const openKey = this.openKey

        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo" />
                    <h1>教育管理后台</h1>
                </Link>
                {/*  defaultSelectedKeys  初始选中的菜单项 key 数组 */}
                {/* selectedKeys  当前选中的菜单项 key 数组 */}
                <Menu mode="inline" theme="dark" selectedKeys={[path]} defaultOpenKeys={[openKey]}>
                    {/* 为了使得每个菜单项路由跳转的唯一，key 值不重复，使用路由作为 key 值 */}
                    {/* <Menu.Item key="/home">
                        <Link to="/home">
                            <Icon type="pie-chart"></Icon>
                            <span>首页</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={
                        <span>
                            <Icon type="mail" />
                            <span>商品</span>
                        </span>
                    }>
                        <Menu.Item key="/category">
                            <Link to="/category">
                                <Icon type="mail" />
                                <span>品类管理</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to="/product">
                                <Icon type="mail" />
                                <span>商品管理</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu> */}
                    
                    { 
                        // this.getMenuNodes(menuList)
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}


// withRouter高阶组件:
// 包装非路由组件, 返回一个新的组件
// 新的组件向非路由组件传递3个属性: history/location/match

// 高阶组件 withRouter 包装 非路由组件 LeftNav，使其具有 history/location/match 属性
export default withRouter(LeftNav)