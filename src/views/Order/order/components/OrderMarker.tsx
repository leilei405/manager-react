import { useImperativeHandle, useState } from 'react'
import { message, Modal } from 'antd'
import { IModalProp, OrderItem } from '@/types'
import { getOrderDetail, updateOrder } from '@/api'

type MarkerTypes = Array<{
  lng: string
  lat: string
  id: number
}>

const OrderMarker = (props: IModalProp) => {
  const [visible, setVisible] = useState(false)
  // 打点数据  最终要上报给接口的
  const [markerData, setMarkerData] = useState<MarkerTypes>([])
  const [markId, setMarkId] = useState('') // 标记点

  // 打开弹窗
  const open = async (data?: OrderItem) => {
    setVisible(true)
    setMarkId(data!.orderId)
    const markerData = await getOrderDetail(data!.orderId)
    renderMap(markerData)
  }

  // 创建marker
  const createMarker = (map: any, lng: string, lat: string) => {
    // 随机生成id 为了在删除时找到对应的marker 并删除
    const id = Math.random()
    markerData.push({ lng, lat, id })
    // 打点
    const marker = new window.BMapGL.Marker(new window.BMapGL.Point(lng, lat))
    marker.id = id

    // 创建右键菜单 取消已经打过的打点
    const markerMenu = new window.BMapGL.ContextMenu()
    markerMenu.addItem(
      new window.BMapGL.MenuItem('删除', function () {
        map.removeOverlay(marker)
        const index = markerData.findIndex(item => item.id === marker.id)
        markerData.splice(index, 1)
        setMarkerData([...markerData]) // 存储markerData
      })
    )
    setMarkerData([...markerData]) // 更新markerData
    marker.addContextMenu(markerMenu) //给标记添加右键菜单
    map.addOverlay(marker) // 添加marker到地图
  }

  // 渲染地图
  const renderMap = (data: OrderItem) => {
    const map = new window.BMapGL.Map('container') // 实例化地图
    map.centerAndZoom(data.cityName, 12) // 设置中心点 城市名称
    const zoomCtrl = new window.BMapGL.ZoomControl() // 添加缩放控件
    map.addControl(zoomCtrl)
    map.enableScrollWheelZoom(true) // 启用缩放

    // 初始化打点 循环打点 差不多是回显的意思
    // 上一次打完点之后你肯定是要回显的 所以需要把上一次的打点数据回显出来
    data.route.forEach(item => {
      createMarker(map, item.lng, item.lat)
    })

    // 地图绑定事件
    map.addEventListener('click', function (e: any) {
      // 点击地图创建marker
      // 经纬度latlng.lng    经度latlng.lat 纬度
      createMarker(map, e.latlng.lng, e.latlng.lat)
    })
  }

  //  暴露方法给父组件
  useImperativeHandle(props.markerRef, () => ({
    open
  }))

  // 确定事件
  const handleOk = async () => {
    await updateOrder({
      orderId: markId,
      route: markerData
    })
    message.success('打点成功')
    handleCancel()
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
