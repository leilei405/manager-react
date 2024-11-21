import React from 'react'
import { Spin } from 'antd'
import './loading.less'

interface ILoadingProps {
  tip?: string
}

export default function Loading(props: ILoadingProps) {
  const { tip = 'Loading' } = props
  return (
    <Spin tip={tip} size='large' className='request-loading'>
      {tip || 'Loading'}
    </Spin>
  )
}
