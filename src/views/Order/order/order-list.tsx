import { useRef } from 'react'
import { Button, Form, Input, Select, Space, Table, TableColumnsType } from 'antd'
import { useAntdTable } from 'ahooks'
import { OrderItem, IAction, OrderParams } from '@/types'
import { getOrderList } from '@/api'
import { orderStateOption } from '@/constant'
import { formatDate, formatMoneyRegExp } from '@/utils'
import CreateOrderModal from './components/CreateOrder'

const OrderList = () => {
  const [form] = Form.useForm()
  const orderRef = useRef<{ open: (type: IAction, data?: OrderItem) => void }>()

  // 获取用户列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: OrderParams) => {
    return getOrderList({
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

  const columns: TableColumnsType<OrderItem> = [
    {
      title: '订单编号',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
      fixed: 'left'
    },
    {
      title: '城市',
      dataIndex: 'cityName',
      key: 'cityName',
      width: 100
    },
    {
      title: '下单地址',
      dataIndex: 'startAddress',
      key: 'startAddress',
      width: 280,
      render: (_value: string, record) => {
        return (
          <div>
            <div>开始地址：{record.startAddress || '-'}</div>
            <div>结束地址：{record.endAddress || '-'}</div>
          </div>
        )
      }
    },
    {
      title: '下单时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 240,
      render: (value: string) => {
        return formatDate(value)
      }
    },
    {
      title: '订单价格',
      dataIndex: 'orderAmount',
      key: 'orderAmount',
      width: 100,
      render: (value: string) => {
        return formatMoneyRegExp(value)
      }
    },
    {
      title: '订单状态',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      render: (value: number) => {
        return orderStateOption.find(item => item.value === value)?.label || '-'
      }
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
      width: 120
    },
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName',
      width: 120
    },
    {
      title: '操作',
      fixed: 'right',
      render: _val => {
        return (
          <Space>
            <Button type='text' onClick={handleDetail}>
              详情
            </Button>
            <Button type='text' onClick={handleDot}>
              打点
            </Button>
            <Button type='text' onClick={handleTrajectory}>
              轨迹
            </Button>
            <Button danger type='text' onClick={handleDeleteOrder}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  // 详情
  const handleDetail = () => {
    //
  }

  // 打点
  const handleDot = () => {
    //
  }

  // 轨迹
  const handleTrajectory = () => {
    //
  }

  // 删除
  const handleDeleteOrder = async () => {
    //
  }

  // 新增
  const handleCreateOrder = () => {
    orderRef.current?.open('create')
  }

  // 导出
  const handleExportFile = () => {}

  return (
    <div>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='订单编号' name='orderId'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='订单状态' name='state'>
          <Select options={orderStateOption} style={{ width: '100%' }} placeholder='请选择用户状态'></Select>
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
            <Button type='primary' onClick={handleCreateOrder}>
              新增
            </Button>
            <Button type='primary' danger onClick={handleExportFile}>
              导出
            </Button>
          </Space>
        </div>
        <Table rowKey='_id' {...tableProps} bordered columns={columns} />
      </div>

      <CreateOrderModal orderRef={orderRef} update={search.reset} />
    </div>
  )
}

export default OrderList