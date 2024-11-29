import { useImperativeHandle, useState } from 'react'
import { IAction, IModalProp, RoleItem } from '@/types'
import { Form, Input, message, Modal } from 'antd'
import { createRole, updateRole } from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const CreateRoleModal = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>('create')

  // 暴露给父组件的方法
  useImperativeHandle(props.roleRef, () => {
    return {
      open
    }
  })

  // 打开模态框
  const open = (type: IAction, data?: RoleItem) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  // 提交表单
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const params = {
        ...form.getFieldsValue()
      }
      if (action === 'create') {
        await createRole(params)
        message.success('创建成功')
      } else if (action === 'edit') {
        await updateRole(params)
        message.success('编辑成功')
      }
      handleCancel()
      props.update()
    }
  }

  // 取消重置操作
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === 'create' ? '新增角色' : '编辑角色'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} colon={false} {...formItemLayout}>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item
          label='角色名称'
          name='roleName'
          rules={[
            { required: true, message: '请输入用户角色' },
            { min: 5, max: 12, message: '最小字符5个字符, 最大12个字符' }
          ]}
        >
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <Input.TextArea rows={5} placeholder='请输入备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateRoleModal
