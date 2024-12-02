import { useRef } from 'react'
import { Button, Form, Input, Select, Space, Table, TableColumnsType } from 'antd'
import { useAntdTable } from 'ahooks'
import { UserInfo, IAction, PageParams, DriverItem } from '@/types'
import { getDrivers } from '@/api'
import { roleOption } from '@/constant'
import { formatDate } from '@/utils'

const DriverList = () => {
  const [form] = Form.useForm()
  const modalRef = useRef<{ open: (type: IAction, data?: UserInfo) => void }>()

  // 获取用户列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: PageParams) => {
    return getDrivers({
      ...formData,
      pageNum: current,
      pageSize
    }).then(result => {
      console.log(result)
      return {
        total: result.total,
        list: result.list
      }
    })
  }

  // 使用ahooks转换列表数据
  const { tableProps, search } = useAntdTable(getTableData, { form })

  // 表格列
  const columns: TableColumnsType<DriverItem> = [
    {
      title: '司机名称',
      dataIndex: 'driverName',
      key: 'driverName'
    },
    {
      title: '司机信息',
      dataIndex: 'userName',
      key: 'userName',
      render: (_value: string, record) => {
        return (
          <div>
            <div>司机ID：{record.driverId}</div>
            <div>手机号码：{record.driverPhone}</div>
            <div>注册城市：{record.cityName}</div>
            <div>会员登记：{record.grade}</div>
            <div>司机等级：{record.driverLevel}</div>
          </div>
        )
      }
    },
    {
      title: '司机状态',
      dataIndex: 'accountStatus',
      key: 'accountStatus'
    },
    {
      title: '车辆信息',
      dataIndex: 'carNo',
      key: 'carNo',
      render: (_value: string, record) => {
        return (
          <div>
            <div>车牌号码：{record.carNo}</div>
            <div>车辆品牌：{record.vehicleBrand}</div>
            <div>车辆名称：{record.vehicleName}</div>
          </div>
        )
      }
    },
    {
      title: '昨日在线时长',
      dataIndex: 'onlineTime',
      key: 'onlineTime'
    },
    {
      title: '昨日司机流水',
      dataIndex: 'driverAmount',
      key: 'driverAmount'
    },
    {
      title: '司机评分',
      dataIndex: 'rating',
      key: 'rating'
    },
    {
      title: '行为分',
      dataIndex: 'driverScore',
      key: 'driverScore'
    },
    {
      title: '昨日推单数',
      dataIndex: 'pushOrderCount',
      key: 'pushOrderCount'
    },
    {
      title: '昨日完单数',
      dataIndex: 'orderCompleteCount',
      key: 'orderCompleteCount'
    },
    {
      title: '加入时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_value: string, record) => {
        return formatDate(record.createTime)
      }
    }
    // {
    //   title: '操作',
    //   render: _val => {
    //     return (
    //       <div>
    //         <Button type='text'>编辑</Button>
    //         <Button type='text'>删除</Button>
    //       </div>
    //     )
    //   }
    // }
  ]

  return (
    <div>
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
            <Button type='primary'>新增</Button>
            <Button type='primary' danger>
              批量删除
            </Button>
          </Space>
        </div>
        <Table rowKey='userId' {...tableProps} bordered columns={columns} />
      </div>
    </div>
  )
}

export default DriverList
