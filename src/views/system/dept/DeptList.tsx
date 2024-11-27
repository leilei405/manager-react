import { formatDate } from '@/utils'
import { Button, Form, Input, message, Modal, Space, Table, TableColumnsType } from 'antd'
import { deleteDeptData, getDeptData } from '@/api'
import { DeptItem, IAction, EditParams } from '@/types'
import { useEffect, useRef, useState } from 'react'
import CreateDept from './CreateDept'

const DeptList = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState<DeptItem[]>([])
  const deptRef = useRef<{ open: (type: IAction, data?: EditParams | { parentId?: string }) => void }>()

  const columns: TableColumnsType<DeptItem> = [
    {
      title: '部门名称',
      dataIndex: 'deptName',
      key: 'deptName'
    },
    {
      title: '部门负责人',
      dataIndex: 'userName',
      key: 'userName'
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
      render: (_, record) => {
        console.log(record)

        return (
          <Space>
            <Button type='text' onClick={() => handleCreateDept(record._id)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDelete(record._id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  // 创建
  const handleCreate = () => {
    deptRef.current?.open('create')
  }

  const handleCreateDept = async (id: string) => {
    deptRef.current?.open('create', { parentId: id })
  }

  // 编辑
  const handleEdit = (data: DeptItem) => {
    deptRef.current?.open('edit', data)
  }

  // 删除
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确定',
      content: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteDeptData({ _id: id })
        message.success('删除成功')
        getDeptListData()
      }
    })
  }

  // 重置
  const handleReset = () => {
    form.resetFields()
  }

  // 获取负责人数据
  const getDeptListData = async () => {
    const result = await getDeptData(form.getFieldsValue())
    setDataSource(result)
  }

  useEffect(() => {
    getDeptListData()
  }, [])

  return (
    <div>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='部门名称' name='deptName'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={getDeptListData} type='primary' htmlType='submit'>
              搜索
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>部门列表</div>
          <Button type='primary' onClick={handleCreate}>
            新增
          </Button>
        </div>
        <Table rowKey='_id' bordered dataSource={dataSource} columns={columns} />
      </div>

      <CreateDept deptRef={deptRef} update={() => getDeptListData()} />
    </div>
  )
}
export default DeptList
