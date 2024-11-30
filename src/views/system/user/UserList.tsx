import { useRef, useState } from 'react'
import { Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType, TableProps } from 'antd'
import { useAntdTable } from 'ahooks'
import { UserInfo, IAction, PageParams } from '@/types'
import { deleteUser, getUserListData } from '@/api'
import { roleOption } from '@/constant'
import { roleFormat, statusFormat, formatDate } from '@/utils'
import CreateUser from './CreateUser'
import AuthButton from '@/views/AuthButton'
import styles from './index.module.less'

const UserList = () => {
  const [form] = Form.useForm()
  const modalRef = useRef<{ open: (type: IAction, data?: UserInfo) => void }>()
  const [selectRowKeys, setSelectRowKeys] = useState<React.Key[]>([])

  // 获取用户列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: PageParams) => {
    return getUserListData({
      ...formData,
      pageNum: current,
      pageSize
    }).then(result => {
      return {
        total: result.page.total,
        list: result.list
      }
    })
  }

  // 使用ahooks转换列表数据
  const { tableProps, search } = useAntdTable(getTableData, { form })

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
      render: (_val, record) => {
        return (
          <div className={styles.action}>
            <Button type='text' onClick={() => handleEditUser(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDeleteUser([record.userId!])}>
              删除
            </Button>
          </div>
        )
      }
    }
  ]

  // 新增用户
  const handleCreateUser = () => {
    modalRef.current?.open('create')
  }

  // 删除用户
  const handleDeleteUser = (userIds: number[]) => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await deleteUser({ userIds: userIds })
        message.success('删除成功')
        setSelectRowKeys([])
        search.reset()
      }
    })
  }

  // 批量删除
  const handleDeleteBatch = () => {
    Modal.confirm({
      title: '确认',
      content: '确认删除该用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await deleteUser({ userIds: selectRowKeys as number[] })
        message.success('删除成功')
        setSelectRowKeys([])
        search.reset()
      }
    })
  }

  // 编辑用户
  const handleEditUser = (record: UserInfo) => {
    modalRef.current?.open('edit', record)
  }

  // 表格rowSelection 配置
  const rowSelection: TableProps<UserInfo>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserInfo[]) => {
      setSelectRowKeys(selectedRowKeys)
      console.log(selectedRows)
    },
    type: 'checkbox'
  }

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
            <Button onClick={search.submit} type='primary' htmlType='submit'>
              搜索
            </Button>
            <Button onClick={search.reset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <Space>
            <AuthButton auth='user@create' type='primary' onClick={handleCreateUser}>
              新增
            </AuthButton>
            <Button type='primary' danger onClick={handleDeleteBatch}>
              批量删除
            </Button>
          </Space>
        </div>
        <Table rowKey='userId' {...tableProps} bordered columns={columns} rowSelection={rowSelection} />
      </div>

      {/* 新增编辑弹窗 */}
      <CreateUser modalRef={modalRef} update={() => search.reset()} />
    </div>
  )
}

export default UserList
