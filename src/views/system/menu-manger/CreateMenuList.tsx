import { useState, useImperativeHandle, useEffect } from 'react'
import { message, Modal, Input, TreeSelect, Form, Radio } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { IModalProp, IAction, EditMenuParams, MenuItem } from '@/types'
import { createMenu, getMenuList, updateMenu } from '@/api'
import { menuTypeOption, menuStateOption } from '@/constant'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const CreateMenu = (props: IModalProp) => {
  const [action, setAction] = useState<IAction>('create')
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [menuList, setMenuList] = useState<MenuItem[]>([])

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

  // 获取菜单列表
  const getMenuData = async () => {
    const result = await getMenuList(form.getFieldsValue())
    setMenuList(result)
  }

  useEffect(() => {
    getMenuData()
  }, [])

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
          <TreeSelect
            placeholder='请选择父级菜单'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'menuName', value: '_id' }}
            treeData={menuList}
          ></TreeSelect>
        </Form.Item>
        <Form.Item
          initialValue='1'
          label='菜单类型'
          name='menuType'
          rules={[{ required: true, message: '请选择菜单类型' }]}
        >
          <Radio.Group options={menuTypeOption}></Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: '请输入菜单名称' }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {() => {
            return form.getFieldValue('menuType') === '2' ? (
              <Form.Item label='权限标识' name='menuCode'>
                <Input placeholder='请输入权限标识' />
              </Form.Item>
            ) : (
              <>
                <Form.Item label='菜单图标' name='icon'>
                  <Input placeholder='请输入菜单图标' />
                </Form.Item>
                <Form.Item label='路由地址' name='path'>
                  <Input placeholder='请输入路由地址' />
                </Form.Item>
              </>
            )
          }}
        </Form.Item>

        <Form.Item label='组件地址' name='component'>
          <Input placeholder='请输入组件地址' />
        </Form.Item>
        <Form.Item label='排序' name='orderBy' tooltip={{ title: '排序值越大越靠后', icon: <InfoCircleOutlined /> }}>
          <Input type='number' min={0} placeholder='请输入组件地址' />
        </Form.Item>
        <Form.Item initialValue='1' label='菜单状态' name='menuState'>
          <Radio.Group options={menuStateOption}></Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateMenu
