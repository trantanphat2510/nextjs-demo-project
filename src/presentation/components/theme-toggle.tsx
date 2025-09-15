"use client"

import type React from "react"
import { Button } from "antd"
import { SunOutlined, MoonOutlined } from "@ant-design/icons"
import { useGlobalStore } from "../stores/global.store"

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useGlobalStore()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button
      type="text"
      icon={theme === "light" ? <MoonOutlined /> : <SunOutlined />}
      onClick={toggleTheme}
      className="flex items-center text-foreground hover:text-primary hover:bg-muted"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    />
  )
}
