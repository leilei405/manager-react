import { useState } from 'react'
import { Button, Form, Input, Select, Space, Table } from 'antd'
import styles from './index.module.less'

const UserList = () => {
  const [dataSource, setDataSource] = useState([{}, {}, {}])

  const columns = [
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户邮箱',
      dataIndex: 'userEmail',
      key: 'userEmail'
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime'
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime'
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: () => {
        return (
          <div className={styles.action}>
            <Button type='text'>编辑</Button>
            <Button type='text'>删除</Button>
          </div>
        )
      }
    }
  ]

  return (
    <div className={styles.userList}>
      <Form className='searchForm' layout='inline'>
        <Form.Item label='用户ID'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名称'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='状态'>
          <Select placeholder='请选择用户状态'>
            <Select.Option value='1'>所有</Select.Option>
            <Select.Option value='2'>在职</Select.Option>
            <Select.Option value='3'>离职</Select.Option>
            <Select.Option value='4'>试用期</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <Space>
            <Button type='primary'>新增</Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </Space>
        </div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}

export default UserList
