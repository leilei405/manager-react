import React, { useEffect } from 'react'
import request from '@/utils/request'
export default function Welcome() {
  useEffect(() => {
    request.post('/api/users/login', {
      params: {
        name: '张三'
      }
    })
  }, [])
  return <div>Welcome</div>
}
