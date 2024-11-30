import { useEffect, useImperativeHandle, useState } from 'react'
import { IAction, IModalProp, MenuItem, RoleItem } from '@/types'
import { Form, Input, Tree, Modal, message } from 'antd'
import { getMenuList, setRolePermission } from '@/api'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 }
}

const SetPermission = (props: IModalProp) => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [treeData, setTreeData] = useState<MenuItem[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [roleInfo, setRoleInfo] = useState<RoleItem>()
  const [permission, setPermission] = useState<RoleItem>()

  // 暴露给父组件的方法
  useImperativeHandle(props.permissionRef, () => {
    return {
      open
    }
  })

  // 打开模态框
  const open = (type: IAction, data?: RoleItem) => {
    setVisible(true)
    setRoleInfo(data)
  }

  // 取消重置操作
  const handleCancel = () => {
    setPermission(undefined)
    setVisible(false)
    form.resetFields()
  }

  const onCheck = (checkKeys: any, item: any) => {
    setCheckedKeys(checkKeys)
    const checkedKeys: string[] = []
    const parentKeys: string[] = []
    item.checkedNodes.map((node: MenuItem) => {
      // 按钮类型
      if (node.menuType === 2) {
        checkedKeys.push(node._id)
      } else {
        parentKeys.push(node._id)
      }
    })
    setPermission({
      _id: roleInfo?._id || '',
      permissionList: {
        checkedKeys: checkKeys,
        halfCheckedKeys: parentKeys.concat(item.halfCheckedKeys)
      }
    })
  }

  // 提交表单
  const handleSubmit = async () => {
    if (!permission) return
    await setRolePermission(permission)
    message.success('设置权限成功')
    handleCancel()
    props.update()
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
        <Form.Item label='角色名称'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item label='权限'>
          <Tree
            checkable
            defaultExpandAll
            fieldNames={{ title: 'menuName', key: '_id', children: 'children' }}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SetPermission
