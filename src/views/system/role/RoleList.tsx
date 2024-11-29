import { useRef } from 'react'
import { Input, Space, Button, Table, Form, TableColumnsType, Modal } from 'antd'
import { useAntdTable } from 'ahooks'
import { formatDate } from '@/utils'
import { deleteRole, getRoleListData } from '@/api'
import { IAction, PageParams, RoleItem } from '@/types'
import CreateRoleModal from './CreateRole'

const RoleList = () => {
  const [form] = Form.useForm()
  const roleRef = useRef<{ open: (type: IAction, data?: RoleItem) => void }>()

  const getRoleList = ({ current, pageSize }: { current: number; pageSize: number }, formData: PageParams) => {
    return getRoleListData({
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

  const { tableProps, search } = useAntdTable(getRoleList, { form })

  // 表格列
  const columns: TableColumnsType<RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'roleName',
      key: 'roleName'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      render: (value: string) => {
        return value || '-'
      }
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (value: string) => {
        return formatDate(value)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value: string) => {
        return formatDate(value)
      }
    },
    {
      title: '操作',
      render: (_val, record) => {
        return (
          <Space>
            <Button type='text' onClick={() => handleEditRole(record)}>
              编辑
            </Button>
            <Button type='text'>设置权限</Button>
            <Button type='text' onClick={() => handleDeleteRole(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  // 新增角色
  const handleCreateRole = () => {
    roleRef.current?.open('create')
  }

  // 编辑角色
  const handleEditRole = (record: RoleItem) => {
    roleRef.current?.open('edit', record)
  }

  // 删除角色
  const handleDeleteRole = (record: RoleItem) => {
    Modal.confirm({
      title: '确定',
      content: '确定要删除该角色吗?',
      onOk: async () => {
        await deleteRole({ _id: record._id || '' })
        search.reset()
      },
      cancelText: '取消',
      okText: '确定'
    })
  }

  return (
    <div>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='角色名称' name='roleName'>
          <Input placeholder='请输入角色名称' />
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
          <div className='title'>角色列表</div>
          <Space>
            <Button type='primary' onClick={handleCreateRole}>
              新增
            </Button>
          </Space>
        </div>

        <Table rowKey='_id' {...tableProps} bordered columns={columns} />
      </div>
      <CreateRoleModal roleRef={roleRef} update={search.reset} />
    </div>
  )
}

export default RoleList
