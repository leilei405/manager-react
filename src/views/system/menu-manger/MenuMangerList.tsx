import { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, message, Modal, Select, Space, Table, TableColumnsType } from 'antd'
import { formatDate } from '@/utils'
import { deleteMenu, getMenuList } from '@/api'
import { EditMenuParams, IAction, MenuItem } from '@/types'
import CreateMenu from './CreateMenuList'

const MenuMangerList = () => {
  const [form] = Form.useForm()
  const [dataSource, setDataSource] = useState<MenuItem[]>([])
  const menuRef = useRef<{
    open: (type: IAction, data?: EditMenuParams | { parentId?: string; orderBy?: number }) => void
  }>()

  const columns: TableColumnsType<MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      key: 'menuName'
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon'
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      key: 'menuType',
      render: (value: number) => {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面'
        }[value]
      }
    },
    {
      title: '权限标识',
      dataIndex: 'menuCode',
      key: 'menuCode'
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '组件路径',
      dataIndex: 'component',
      key: 'component'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value: string) => {
        return formatDate(value)
      }
    },
    {
      title: '操作',
      render: (_, record) => {
        return (
          <Space>
            <Button type='text' onClick={() => handleSubMenu(record)}>
              新增
            </Button>
            <Button type='text' onClick={() => handleEditMenu(record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => handleDeleteMenu(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  // 新增菜单
  const handleCreateMenu = () => {
    menuRef.current?.open('create', {
      orderBy: dataSource.length
    })
  }

  // 新增子菜单
  const handleSubMenu = (data: MenuItem) => {
    menuRef.current?.open('create', { parentId: data._id, orderBy: data.children?.length })
  }

  // 编辑菜单
  const handleEditMenu = (data: MenuItem) => {
    menuRef.current?.open('edit', data)
  }

  // 删除菜单
  const handleDeleteMenu = (data: MenuItem) => {
    const text = {
      1: '菜单',
      2: '按钮',
      3: '页面'
    }[data.menuType]

    Modal.confirm({
      title: '确定',
      content: `确定删除${text}吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        await deleteMenu({ _id: data._id })
        message.success('删除成功')
        getMenuData()
      }
    })
  }

  // 获取菜单列表
  const getMenuData = async () => {
    const result = await getMenuList(form.getFieldsValue())
    setDataSource(result)
  }

  useEffect(() => {
    getMenuData()
  }, [])

  return (
    <div>
      <Form className='searchForm' layout='inline' form={form}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState' initialValue={1}>
          <Select style={{ width: 150 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>禁用</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button onClick={getMenuData} type='primary' htmlType='submit'>
              搜索
            </Button>
            <Button>重置</Button>
          </Space>
        </Form.Item>
      </Form>

      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>菜单管理</div>
          <Button type='primary' onClick={handleCreateMenu}>
            新增
          </Button>
        </div>
        <Table rowKey='_id' bordered dataSource={dataSource} columns={columns} />
      </div>

      <CreateMenu menuRef={menuRef} update={getMenuData} />
    </div>
  )
}

export default MenuMangerList
