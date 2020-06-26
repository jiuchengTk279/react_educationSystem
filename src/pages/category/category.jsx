import React, { Component } from 'react'
import { Card, Table, Button, Icon, Table, Tabs } from 'antd'
import LinkButton from '../../components/link-button/index'

// 商品分类路由
export default class Category extends Component {
    render () {

        // card 的左侧
        const title = '一级分类列表'
        // card 的右侧
        const extra = (
            <Button type="primary">
                <Icon type="plus">添加</Icon>
            </Button>
        )

        const dataSource = [
            {
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号',
            },
            {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号',
            }
        ]
        
        const columns = [
            {
                title: '分类的名称',
                dataIndex: 'name' // 显示数据对应的属性
            },
            {
                title: '操作',
                width: 300,
                render: () => { // 返回需要显示的界面标签
                    <span>
                        <LinkButton>修改分类</LinkButton>
                        <LinkButton>查看子分类</LinkButton>
                    </span>
                }
            }
        ]

        return (
            <Card title={title} extra={extra}>
                {/* rowKey 关键字，表格行 key 的取值，可以是字符串或一个函数 */}
                <Table bordered rowKey='_id' dataSource={dataSource} columns={columns}></Table>
            </Card>
        )
    }
}