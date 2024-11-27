import { useEffect, useState, useImperativeHandle } from 'react'
import { Form, Input, message, Modal, Select, TreeSelect } from 'antd'
import { EditParams, IAction, IModalProp, DeptItem, OptionsTypes } from '@/types'
import { createDeptData, getAllUserList, getDeptData, updateDeptData } from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const CreateDept = (props: IModalProp) => {
  const [action, setAction] = useState<IAction>('create')
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [deptList, setDeptList] = useState<DeptItem[]>([])
  const [userOption, setUserOption] = useState<OptionsTypes>([])

  // 提交表单
  const handleSubmit = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === 'create') {
        await createDeptData(form.getFieldsValue())
        message.success('新增成功')
      } else {
        await updateDeptData(form.getFieldsValue())
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

  const open = (type: IAction, data?: EditParams | { parentId: string }) => {
    setAction(type)
    setVisible(true)
    if (data) {
      form.setFieldsValue(data)
    }
  }

  // 暴露一些方法给父组件的方法
  useImperativeHandle(props.deptRef, () => ({
    open
  }))

  // 部门树数据
  const deptTreeList = async () => {
    const result = await getDeptData()
    setDeptList(result)
  }

  // 所有用户列表数据
  const getUserListData = async () => {
    const result = await getAllUserList()
    const data = result.map(item => ({
      value: item?.userId!,
      label: item?.userName!
    }))

    setUserOption(data)
  }

  useEffect(() => {
    getUserListData()
    deptTreeList()
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
        <Form.Item hidden name='_id'>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            placeholder='请选择部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          ></TreeSelect>
        </Form.Item>
        <Form.Item name='deptName' label='部门名称' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' rules={[{ required: true, message: '请选择部门名称' }]} name='userName'>
          <Select options={userOption} placeholder='请选择负责人'></Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
