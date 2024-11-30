import { Col, DatePicker, Form, Input, message, Modal, Row, Select } from 'antd'
import { useEffect, useImperativeHandle, useState } from 'react'
import { DictItem, IModalProp } from '@/types'
import { orderStateOption } from '@/constant'
import { createOrder, getCityList, getVehicleList } from '@/api'

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 18 }
}

const CreateOrderModal = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [cityList, setCityList] = useState<DictItem[]>([])
  const [vehicleList, setVehicleList] = useState<DictItem[]>([])

  // 获取城市列表
  const getCityDataList = async () => {
    const result = await getCityList()
    setCityList(result)
  }

  // 获取车型列表
  const getVehicleDataList = async () => {
    const result = await getVehicleList()
    setVehicleList(result)
  }

  // 打开弹窗
  const open = () => {
    setVisible(true)
  }

  // 暴露方法给父组件
  useImperativeHandle(props.orderRef, () => {
    return {
      open
    }
  })

  // 确定
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = form.getFieldsValue()
      await createOrder(params)
      message.success('创建成功')
    }
    setVisible(false)
    props.update()
  }

  // 取消
  const handleCancel = () => {
    setVisible(false)
  }

  // 用车时间
  const onChangeUseTime = () => {
    //
  }

  // 选择结束时间
  const onChangeSelectEndTime = () => {
    //
  }

  useEffect(() => {
    getCityDataList()
    getVehicleDataList()
  }, [])

  return (
    <Modal
      title='创建订单'
      width={800}
      open={visible}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} colon={false} {...formItemLayout}>
        <Row>
          <Col span={12}>
            <Form.Item label='城市名称' name='cityName' rules={[{ required: true, message: '请输入城市名称' }]}>
              <Select
                placeholder='请选择城市名称'
                options={cityList}
                fieldNames={{ label: 'name', value: 'name' }}
              ></Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='车型' name='vehicleName' rules={[{ required: true, message: '请选择车型' }]}>
              <Select
                placeholder='请选择车型'
                options={vehicleList}
                fieldNames={{ label: 'name', value: 'name' }}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
              <Input placeholder='请输入用户名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='手机号' name='mobile'>
              <Input placeholder='请输入下单手机号' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='起始地址' name='startAddress'>
              <Input placeholder='请输入起始地址' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束地址' name='endAddress'>
              <Input placeholder='请输入结束地址' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='下单金额' name='orderAmount' rules={[{ required: true, message: '请输入下单金额' }]}>
              <Input placeholder='请输入下单金额' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='支付金额' name='userPayAmount' rules={[{ required: true, message: '请输入支付金额' }]}>
              <Input placeholder='请输入支付金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='司机名称' name='driverName' rules={[{ required: true, message: '请输入司机名称' }]}>
              <Input placeholder='请输入司机名称' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='司机金额' name='driverAmount' rules={[{ required: true, message: '请输入司机金额' }]}>
              <Input type='number' placeholder='请输入司机金额' />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='支付方式' name='payType' initialValue={1}>
              <Select placeholder='请选择支付方式'>
                <Select.Option value={1}>微信</Select.Option>
                <Select.Option value={2}>支付宝</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='订单状态' name='state' initialValue={1}>
              <Select placeholder='请选择订单状态' options={orderStateOption}></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label='用车时间' name='useTime'>
              <DatePicker placeholder='请选择用车时间' style={{ width: '100%' }} onChange={onChangeUseTime} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label='结束时间' name='endTime'>
              <DatePicker placeholder='请选择结束时间' style={{ width: '100%' }} onChange={onChangeSelectEndTime} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
export default CreateOrderModal
