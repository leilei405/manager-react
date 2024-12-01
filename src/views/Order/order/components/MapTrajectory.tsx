import { useImperativeHandle, useState } from 'react'
import { message, Modal } from 'antd'
import { IModalProp, OrderItem } from '@/types'
import { getOrderDetail } from '@/api'

const MapTrajectory = (props: IModalProp) => {
  const [visible, setVisible] = useState(false)
  const [trackAni, setTrackAni] = useState<{ cancel?: () => void }>()

  const open = async (data?: OrderItem) => {
    const detail = await getOrderDetail(data!.orderId)
    if (detail.route.length > 0) {
      setVisible(true)
      setTimeout(() => {
        renderMap(detail)
      })
    } else {
      message.warning('请先进行打点操作')
    }
  }

  const renderMap = (data: OrderItem) => {
    const map = new window.BMapGL.Map('mapTrajectory') // 实例化地图
    map.enableScrollWheelZoom(true) // 启用缩放
    map.centerAndZoom(data.cityName, 17) // 设置中心点城市名称

    const path = data.route || []
    let point = []
    for (var i = 0; i < path.length; i++) {
      point.push(new window.BMapGL.Point(path[i].lng, path[i].lat))
    }

    const polyline = new window.BMapGL.Polyline(point, {
      strokeColor: '#a170f2', // 线条颜色
      strokeWeight: 6, // 线条宽度
      strokeOpacity: 1 // 线条透明度
    })

    setTimeout(() => {
      start()
    }, 100)

    function start() {
      const trackAni = new window.BMapGLLib.TrackAnimation(map, polyline, {
        overallView: true,
        tilt: 30,
        duration: 20000,
        delay: 300
      })
      trackAni.start()
      setTrackAni(trackAni)
    }
  }

  useImperativeHandle(props.mapTrajectoryRef, () => ({
    open
  }))

  const handleOk = () => {
    trackAni?.cancel?.()
    setVisible(false)
  }

  const handleCancel = () => {
    // 关闭的时候取消动画
    trackAni?.cancel?.()
    setVisible(false)
  }

  return (
    <Modal
      title='运行轨迹'
      open={visible}
      okText='确定'
      width={1200}
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div id='mapTrajectory' style={{ height: 600 }} />
    </Modal>
  )
}

export default MapTrajectory
