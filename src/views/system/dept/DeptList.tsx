import { formatDate } from '@/utils'
import { Button, Form, Input, Space, Table, TableColumnsType } from 'antd'
import { getDeptData } from '@/api'
import { DeptItem } from '@/types'
import { useEffect, useState } from 'react'

const DeptList = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState<DeptItem[]>([])

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
      render: () => {
        return (
          <Space>
            <Button type='text'>新增</Button>
            <Button type='text'>编辑</Button>
            <Button type='text'>删除</Button>
          </Space>
        )
      }
    }
  ]

  const getDeptListData = async () => {
    const result = await getDeptData(form.getFieldsValue())
    setDataSource(result)
  }

  useEffect(() => {
    getDeptListData()
  }, [])

  const handleReset = () => {
    form.resetFields()
  }

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
          <Button type='primary'>新增</Button>
        </div>
        <Table rowKey='parentId' bordered dataSource={dataSource} columns={columns} />
      </div>
    </div>
  )
}
export default DeptList
