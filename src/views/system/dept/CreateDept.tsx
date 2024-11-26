import { useEffect, useState } from 'react'
import { Form, Input, Modal, Select, TreeSelect } from 'antd'
import { DeptItem, IAction } from '@/types'
import { getAllUserList } from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const CreateDept = () => {
  const [action, setAction] = useState<IAction>('create')
  const [deptList, setDeptList] = useState<DeptItem[]>([])
  const [userOption, setUserOption] = useState<Array<{ label: string; value: number }>>([])

  // 提交表单
  const handleSubmit = () => {
    // TODO:
  }

  // 取消重置操作
  const handleCancel = () => {
    // TODO:
  }

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
      open={true}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form {...formItemLayout} labelAlign='right'>
        <Form.Item label='上级部门'>
          <TreeSelect
            placeholder='请选择部门'
            allowClear
            treeDefaultExpandAll
            fieldNames={{ label: 'deptName', value: '_id' }}
            treeData={deptList}
          ></TreeSelect>
        </Form.Item>
        <Form.Item label='部门名称' rules={[{ required: true, message: '请输入部门名称' }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' rules={[{ required: true, message: '请选择部门名称' }]}>
          <Select placeholder='请选择负责人'>
            {userOption.map(item => {
              return <Select.Option value={item.value}>{item.label}</Select.Option>
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default CreateDept
