import { useState, useImperativeHandle } from 'react'
import { message, Modal, Input, TreeSelect, Form, Radio } from 'antd'
import { IModalProp, IAction, EditMenuParams } from '@/types'
import { createMenu, updateMenu } from '@/api'
import { menuTypeOption, menuStateOption } from '@/constant'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const CreateMenu = (props: IModalProp) => {
  const [action, setAction] = useState<IAction>('create')
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)

  // 提交表单
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await createMenu(form.getFieldsValue())
        message.success('新增成功')
      } else {
        await updateMenu(form.getFieldsValue())
        message.success('编辑成功')
      }
    }
    handleCancel()
    props.update()
  }

  // 取消重置操作
  const handleCancel = () => {
    form.resetFields()
    setVisible(false)
  }

  const open = (type: IAction, data?: EditMenuParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  // 暴露一些方法给父组件的方法
  useImperativeHandle(props.menuRef, () => ({
    open
  }))

  return (
    <Modal
      title={action === 'create' ? '新增菜单' : '编辑菜单'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} {...formItemLayout} labelAlign='right'>
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单' name=''>
          <TreeSelect></TreeSelect>
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType' rules={[{ required: true, message: '请选择菜单类型' }]}>
          <Radio.Group defaultValue={'1'} options={menuTypeOption}></Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单图标' name='icon'>
          <Input placeholder='请输入菜单图标' />
        </Form.Item>
        <Form.Item label='路由地址' name='path'>
          <Input placeholder='请输入路由地址' />
        </Form.Item>
        <Form.Item label='组件地址' name='component'>
          <Input placeholder='请输入组件地址' />
        </Form.Item>
        <Form.Item label='排序' name='orderBy'>
          <Input type='number' min={0} placeholder='请输入组件地址' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group defaultValue={'1'} options={menuStateOption}></Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
