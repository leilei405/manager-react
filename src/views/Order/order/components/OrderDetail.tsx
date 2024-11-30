import { memo, useEffect, useImperativeHandle, useState } from 'react'
import { Descriptions, DescriptionsProps, Modal } from 'antd'
import { DictItem, IModalProp, OrderItem } from '@/types'
import { formatDate, formatPhone } from '@/utils'
import { getVehicleList } from '@/api'
import { orderStateOption } from '@/constant'

const OrderDetail = (props: IModalProp) => {
  const [visible, setVisible] = useState(false)
  const [detail, setDetail] = useState<OrderItem>()
  const [vehicleList, setVehicleList] = useState<DictItem[]>([])

  // 获取车型列表
  const getVehicleDataList = async () => {
    const result = await getVehicleList()
    setVehicleList(result)
  }

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '订单编号',
      children: detail?.orderId || '--'
    },
    {
      key: '2',
      label: '下单城市',
      children: detail?.cityName || '--'
    },
    {
      key: '3',
      label: '下单用户',
      children: detail?.userName || '--'
    },
    {
      key: '4',
      label: '手机号',
      children: formatPhone(detail?.mobile) || '--'
    },
    {
      key: '5',
      label: '起点',
      children: detail?.startAddress || '--'
    },
    {
      key: '6',
      label: '终点',
      children: detail?.endAddress || '--'
    },
    {
      key: '7',
      label: '订单金额',
      children: detail?.orderAmount || '--'
    },
    {
      key: '8',
      label: '用户支付金额',
      children: detail?.userPayAmount || '--'
    },
    {
      key: '9',
      label: '司机到账金额',
      children: detail?.driverAmount || '--'
    },
    {
      key: '10',
      label: '支付方式',
      children: detail?.payType === 1 ? '微信' : '支付宝'
    },
    {
      key: '11',
      label: '司机名称',
      children: detail?.driverName || '--'
    },
    {
      key: '12',
      label: '订单车型',
      children: vehicleList.find(item => item.id === Number(detail?.vehicleName))?.name || '--'
    },
    {
      key: '13',
      label: '订单状态',
      children: orderStateOption.find(item => item.value === detail?.state)?.label || '--'
    },
    {
      key: '14',
      label: '用车时间',
      children: formatDate(detail?.useTime) || '--'
    },
    {
      key: '15',
      label: '订单结束时间',
      children: formatDate(detail?.endTime) || '--'
    },
    {
      key: '16',
      label: '订单创建时间',
      children: formatDate(detail?.createTime) || '--'
    }
  ]

  const open = (data?: OrderItem) => {
    setVisible(true)
    setDetail(data)
  }

  useImperativeHandle(
    props.detailRef,
    () => {
      return {
        open
      }
    },
    []
  )

  const handleCancel = () => {
    setVisible(false)
  }

  const handleOk = () => {
    setVisible(false)
  }

  useEffect(() => {
    getVehicleDataList()
  }, [])

  return (
    <Modal
      title='订单详情'
      open={visible}
      width={850}
      okText='确定'
      cancelText='取消'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Descriptions column={2} items={items} />
    </Modal>
  )
}
export default memo(OrderDetail)
