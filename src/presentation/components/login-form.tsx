"use client"

import type React from "react"
import { Form, Input, Button, Typography, Alert, Divider } from "antd"
import { LockOutlined, MailOutlined } from "@ant-design/icons"

const { Title, Text, Link } = Typography

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSwitchToRegister: () => void
  loading: boolean
  error: string | null
}

interface LoginFormData {
  email: string
  password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToRegister, loading, error }) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: LoginFormData) => {
    await onLogin(values.email, values.password)
  }

  const handleDemoLogin = () => {
    form.setFieldsValue({
      email: "demo@example.com",
      password: "password",
    })
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg border border-border shadow-lg">
      <div className="text-center mb-6">
        <Title level={2} className="!mb-2 text-foreground">
          Welcome Back
        </Title>
        <Text type="secondary">Sign in to your account to continue shopping</Text>
      </div>

      {error && <Alert message={error} type="error" showIcon className="mb-4" closable />}

      <Form form={form} name="login" onFinish={handleSubmit} layout="vertical" size="large" autoComplete="off">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-muted-foreground" />}
            placeholder="Enter your email"
            className="bg-input border-border"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-muted-foreground" />}
            placeholder="Enter your password"
            className="bg-input border-border"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="bg-primary hover:bg-secondary border-primary hover:border-secondary h-12"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>

      <div className="text-center mb-4">
        <Button type="link" onClick={handleDemoLogin} className="text-primary hover:text-secondary p-0">
          Use Demo Account (demo@example.com / password)
        </Button>
      </div>

      <Divider className="my-4">
        <Text type="secondary" className="text-sm">
          New to ShopDemo?
        </Text>
      </Divider>

      <div className="text-center">
        <Text type="secondary">
          Don't have an account?{" "}
          <Link onClick={onSwitchToRegister} className="text-primary hover:text-secondary">
            Sign up now
          </Link>
        </Text>
      </div>
    </div>
  )
}
