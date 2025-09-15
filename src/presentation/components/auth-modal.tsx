"use client"

import type React from "react"
import { useState } from "react"
import { Modal } from "antd"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthModalProps {
  open: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => Promise<void>
  onRegister: (email: string, password: string, name: string) => Promise<void>
  loading: boolean
  error: string | null
  initialMode?: "login" | "register"
}

export const AuthModal: React.FC<AuthModalProps> = ({
  open,
  onClose,
  onLogin,
  onRegister,
  loading,
  error,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "register">(initialMode)

  const handleSwitchToRegister = () => {
    setMode("register")
  }

  const handleSwitchToLogin = () => {
    setMode("login")
  }

  const handleLogin = async (email: string, password: string) => {
    await onLogin(email, password)
    if (!error) {
      onClose()
    }
  }

  const handleRegister = async (email: string, password: string, name: string) => {
    await onRegister(email, password, name)
    if (!error) {
      onClose()
    }
  }

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={480} centered destroyOnClose className="auth-modal">
      {mode === "login" ? (
        <LoginForm onLogin={handleLogin} onSwitchToRegister={handleSwitchToRegister} loading={loading} error={error} />
      ) : (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={handleSwitchToLogin}
          loading={loading}
          error={error}
        />
      )}
    </Modal>
  )
}
