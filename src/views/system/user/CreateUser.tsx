import { useState } from 'react'
import { Form, Input, Modal, Select, Upload } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

import { stateOption, roleOption } from '@/constant'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}
const CreateUserModal = () => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState()
  const [loading, setLoading] = useState(false)

  // 提交表单
  const handleSubmit = async () => {
    const valid = form.validateFields()
    console.log(valid)
  }

  // 取消
  const handleCancel = () => {
    // TODO: 取消
  }

  // 上传头像
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <Modal
      title='创建用户'
      okText='确定'
      cancelText='取消'
      width={800}
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} colon={false} {...formItemLayout}>
        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='邮箱' name='userEmail' rules={[{ required: true, message: '请输入邮箱' }]}>
          <Input placeholder='请输入邮箱' />
        </Form.Item>
        <Form.Item label='手机号' name='mobile '>
          <Input type='number' maxLength={11} placeholder='请输入手机号' />
        </Form.Item>
        <Form.Item label='部门' name='deptId' rules={[{ required: true, message: '请选择部门' }]}>
          <Select placeholder='请选择部门'>
            <Select.Option value='0'>普通用户</Select.Option>
            <Select.Option value='1'>管理员</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='岗位' name='job'>
          <Input placeholder='请输入岗位' />
        </Form.Item>
        <Form.Item label='状态' name='state'>
          <Select placeholder='请选择状态'>
            {stateOption.map(item => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label='系统角色' name='role'>
          <Select placeholder='请选择系统角色'>
            {roleOption.map(item => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item label='用户头像' name='userEmail'>
          <Upload
            name='avatar'
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
