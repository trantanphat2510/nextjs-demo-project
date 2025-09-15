"use client"

import type React from "react"
import { Form, Input, Button, Typography, Alert, Divider } from "antd"
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons"

const { Title, Text, Link } = Typography

interface RegisterFormProps {
  onRegister: (email: string, password: string, name: string) => Promise<void>
  onSwitchToLogin: () => void
  loading: boolean
  error: string | null
}

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onSwitchToLogin, loading, error }) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: RegisterFormData) => {
    await onRegister(values.email, values.password, values.name)
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card rounded-lg border border-border shadow-lg">
      <div className="text-center mb-6">
        <Title level={2} className="!mb-2 text-foreground">
          Create Account
        </Title>
        <Text type="secondary">Join ShopDemo and start shopping today</Text>
      </div>

      {error && <Alert message={error} type="error" showIcon className="mb-4" closable />}

      <Form form={form} name="register" onFinish={handleSubmit} layout="vertical" size="large" autoComplete="off">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            { required: true, message: "Please input your name!" },
            { min: 2, message: "Name must be at least 2 characters!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="text-muted-foreground" />}
            placeholder="Enter your full name"
            className="bg-input border-border"
          />
        </Form.Item>

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

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error("Passwords do not match!"))
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-muted-foreground" />}
            placeholder="Confirm your password"
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
            Create Account
          </Button>
        </Form.Item>
      </Form>

      <Divider className="my-4">
        <Text type="secondary" className="text-sm">
          Already have an account?
        </Text>
      </Divider>

      <div className="text-center">
        <Text type="secondary">
          Already registered?{" "}
          <Link onClick={onSwitchToLogin} className="text-primary hover:text-secondary">
            Sign in here
          </Link>
        </Text>
      </div>
    </div>
  )
}
