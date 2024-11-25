import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, Select, Space, Table, TableColumnsType } from 'antd'
import { IUserListResult, PageParams, UserInfo, IModalProp, IAction } from '@/types'
import { getUserListData } from '@/api'
import { roleOption } from '@/constant'
import { roleFormat, statusFormat, formatDate } from '@/utils'
import CreateUser from './CreateUser'
import styles from './index.module.less'

const UserList = () => {
  const [form] = Form.useForm()
  const modalRef = useRef<{ open: (type: IAction, data?: UserInfo) => void | undefined }>()
  const [dataSource, setDataSource] = useState<IUserListResult['list']>([])
  const [total, setTotal] = useState(0)
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })

  // 表格列
  const columns: TableColumnsType<UserInfo> = [
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
      key: 'role',
      render: (value: string) => {
        return roleFormat(value)
      }
    },
    {
      title: '用户状态',
      dataIndex: 'state',
      key: 'state',
      render: (value: number) => {
        return statusFormat(value)
      }
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value: string) => {
        return formatDate(value)
      }
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
            <Button type='text' onClick={handleEditUser}>
              编辑
            </Button>
            <Button type='text' onClick={handleDeleteUser}>
              删除
            </Button>
          </div>
        )
      }
    }
  ]

  // 获取用户列表
  const getUserList = async (params: PageParams) => {
    const values = form.getFieldsValue()
    const result = await getUserListData({
      ...values,
      pageNum: params.pageNum,
      pageSize: params.pageSize
    })

    const { pageNum = 1, pageSize = 10, total = 0 } = result.page
    setDataSource(result.list)
    setTotal(total)
    setPagination({
      current: pageNum,
      pageSize: pageSize
    })
  }

  // 搜索
  const handleSearch = async () => {
    getUserList({
      pageNum: 1,
      pageSize: pagination.pageSize
    })
  }

  // 重置
  const onReset = () => {
    form.resetFields()
  }

  // 新增用户
  const handleCreateUser = () => {
    modalRef.current?.open('create')
  }

  // 删除用户
  const handleDeleteUser = () => {
    console.log('删除用户')
  }

  // 编辑用户
  const handleEditUser = () => {
    console.log('编辑用户')
    modalRef.current?.open('edit')
  }

  // 初始化
  useEffect(() => {
    getUserList({ pageNum: pagination.current, pageSize: pagination.pageSize })
  }, [pagination.current, pagination.pageSize])

  return (
    <div className={styles.userList}>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='用户ID' name='userId'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select style={{ width: '100%' }} placeholder='请选择用户状态'>
            {roleOption.map(item => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={handleSearch} type='primary' htmlType='submit'>
              搜索
            </Button>
            <Button onClick={onReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <Space>
            <Button type='primary' onClick={handleCreateUser}>
              新增
            </Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </Space>
        </div>
        <Table
          rowKey='userId'
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={{
            ...pagination,
            total,
            showSizeChanger: true,
            showTotal: (total: number) => {
              return `共${total}条`
            },
            onChange: (pageNum: number, pageSize: number) => {
              setPagination({
                current: pageNum,
                pageSize
              })
              getUserList({ pageNum, pageSize })
            }
          }}
        />
      </div>

      {/* 新增编辑弹窗 */}
      <CreateUser
        modalRef={modalRef}
        update={() => {
          getUserList({ pageNum: pagination.current, pageSize: pagination.pageSize })
        }}
      />
    </div>
  )
}

export default UserList
