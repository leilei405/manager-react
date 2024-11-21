import React, { useEffect } from 'react'
import request from '@/utils/request'

export default function Welcome() {
  useEffect(() => {
    request.post('/users/login', {
      id: '12356'
    })
  }, [])

  return <div>Login</div>
}
