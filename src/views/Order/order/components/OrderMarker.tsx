import { getOrderDetail } from '@/api'
import { IModalProp, OrderItem } from '@/types'
import { Modal } from 'antd'
import { useImperativeHandle, useState } from 'react'

const OrderMarker = (props: IModalProp) => {
  const [visible, setVisible] = useState(false)

  // 打开弹窗
  const open = async (data?: OrderItem) => {
    setVisible(true)
    const markerData = await getOrderDetail(data!.orderId)
    renderMap(markerData)
  }

  // 渲染地图
  const renderMap = (data: OrderItem) => {
    // 实例化地图
    const map = new window.BMapGL.Map('container')
    // 设置中心点 城市名称
    map.centerAndZoom(data.cityName, 12)
    // 添加缩放控件
    const zoomCtrl = new window.BMapGL.ZoomControl()
    map.addControl(zoomCtrl)
    // 启用缩放
    map.enableScrollWheelZoom(true)
  }

  //  暴露方法给父组件
  useImperativeHandle(props.markerRef, () => ({
    open
  }))

  // 确定事件
  const handleOk = () => {
    1
    setVisible(false)
  }

  // 取消事件
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      title='地图打点'
      open={visible}
      okText='确定'
      width={1200}
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id='container' style={{ height: 600 }} />
    </Modal>
  )
}
export default OrderMarker
