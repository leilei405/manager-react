import { useEffect, useImperativeHandle, useState } from 'react'
import { IAction, IModalProp, RoleItem } from '@/types'
import { Form, Input, Tree, Modal } from 'antd'
import { createRole, getMenuList, getRoleList, updateRole } from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const SetPermission = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [treeData, setTreeData] = useState([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  // 暴露给父组件的方法
  useImperativeHandle(props.permissionRef, () => {
    return {
      open
    }
  })

  // 打开模态框
  const open = (type: IAction, data?: RoleItem) => {
    setVisible(true)
  }

  // 提交表单
  const handleSubmit = async () => {
    const valid = await form.validateFields()
  }

  // 取消重置操作
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  const onCheck = () => {
    //
  }

  const getTreeData = async () => {
    const result = await getMenuList()
    setTreeData(result)
  }

  useEffect(() => {
    getTreeData()
  }, [])

  return (
    <Modal
      title='设置权限'
      okText='确定'
      cancelText='取消'
      width={800}
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form form={form} colon={false} {...formItemLayout}>
        <Form.Item label='角色名称' name='roleName'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='备注' name='remark'>
          <Tree checkable onCheck={onCheck} checkedKeys={checkedKeys} treeData={treeData} />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SetPermission
