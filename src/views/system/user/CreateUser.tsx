import { useState } from 'react'
import { Form, GetProp, Input, message, Modal, Select, Upload, UploadProps } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { stateOption, roleOption } from '@/constant'
import { getStorage } from '@/utils'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

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

  // 上传前的回调
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传 JPG/PNG 格式图片')
    }
    const isLt500K = file.size / 1024 / 1024 < 0.5
    if (!isLt500K) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt500K
  }

  // 上传后的回调
  const handleChange: UploadProps['onChange'] = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }

    if (info.file.status === 'done') {
      setLoading(false)
      const { code, data, msg } = info.file.response
      if (+code === 0) {
        setImageUrl(data.file)
      } else {
        message.error(msg)
      }
    } else if (info.file.status === 'error') {
      message.error('服务器异常，请稍后重试！！！')
    }
  }

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
        <Form.Item label='用户头像'>
          <Upload
            listType='picture-card'
            className='avatar-uploader'
            showUploadList={false}
            action='/api/users/upload'
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={{
              Authorization: 'Bearer ' + getStorage('token'),
              icode: '83ED095F04E97C39'
            }}
          >
            {imageUrl ? <img src={imageUrl} alt='avatar' style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateUserModal
