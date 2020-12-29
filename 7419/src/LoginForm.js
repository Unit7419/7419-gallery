import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { isLoginService, ls, LOCAL_STORAGE_LOGIN_KEY } from './utils'

export const LoginForm = props => {
  const onLogin = async values => {
    const { status, msg } = (await isLoginService(values)) || {}

    if (status) {
      props.inject()
      message.success(msg)

      if (values.remember) {
        ls.set(LOCAL_STORAGE_LOGIN_KEY, JSON.stringify(values))
      }

      return
    }

    message.error(msg)
  }

  return (
    <div
      style={{
        padding: '20px 80px',
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onLogin}
      >
        <Form.Item
          name="name"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a
            className="login-form-forgot"
            href="mailto:rollawaypoint@gmail.com"
          >
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
