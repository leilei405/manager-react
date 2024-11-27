import { useEffect, useState, useImperativeHandle } from 'react'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { DeptItem, EditParams, IAction, IModalProp } from '@/types'
import { getAllUserList } from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const CreateDept = (props: IModalProp) => {
  const [action, setAction] = useState<IAction>('create')
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<DeptItem[]>([])
  const [userOption, setUserOption] = useState<Array<{ label: string; value: number }>>([])

  // 提交表单
  const handleSubmit = () => {
    setVisible(false)
  }

  // 取消重置操作
  const handleCancel = () => {
    setVisible(false)
  }

  const open = (type: IAction, data?: EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    form.setFieldsValue(data)
  }

  // 暴露一些方法给父组件的方法
  useImperativeHandle(props.deptRef, () => ({
    open
  }))

  // 获取所有用户列表数据
  const getUserListData = async () => {
    const result = await getAllUserList()

    setUserOption(
      result.map(item => ({
        value: item?.userId!,
        label: item?.userName!
      }))
    )
  }

  useEffect(() => {
    getUserListData()
  }, [])

  return (
    <Modal
      title={action === 'create' ? '新增部门' : '编辑部门'}
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} {...formItemLayout} labelAlign='right'>
        <Form.Item label='上级部门' name='deptName'>
          <TreeSelect
            placeholder='请选择部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          ></TreeSelect>
        </Form.Item>
        <Form.Item label='部门名称' rules={[{ required: true, message: '请输入部门名称' }]} name=''>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' rules={[{ required: true, message: '请选择部门名称' }]} name='userName'>
          <Select placeholder='请选择负责人'>
            {userOption.map(item => {
              return (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              )
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
