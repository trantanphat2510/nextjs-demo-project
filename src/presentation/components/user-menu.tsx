"use client"

import type React from "react"
import { Dropdown, Button, Avatar, Typography, Space } from "antd"
import { UserOutlined, LogoutOutlined, SettingOutlined, ShoppingOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import type { User } from "../../domain/entities/user.entity"

const { Text } = Typography

interface UserMenuProps {
  user: User
  onLogout: () => void
  onProfile: () => void
  onOrders: () => void
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onProfile, onOrders }) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <div className="flex items-center gap-2 py-2">
          <UserOutlined />
          <span>Profile</span>
        </div>
      ),
      onClick: onProfile,
    },
    {
      key: "orders",
      label: (
        <div className="flex items-center gap-2 py-2">
          <ShoppingOutlined />
          <span>My Orders</span>
        </div>
      ),
      onClick: onOrders,
    },
    {
      key: "settings",
      label: (
        <div className="flex items-center gap-2 py-2">
          <SettingOutlined />
          <span>Settings</span>
        </div>
      ),
      onClick: () => console.log("Settings clicked"),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2 py-2 text-destructive">
          <LogoutOutlined />
          <span>Logout</span>
        </div>
      ),
      onClick: onLogout,
    },
  ]

  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomRight" trigger={["click"]} className="cursor-pointer">
      <Button type="text" className="flex items-center gap-2 h-auto p-2 hover:bg-muted">
        <Avatar src={user.avatar} icon={<UserOutlined />} size="small" className="bg-primary" />
        <Space direction="vertical" size={0} className="hidden sm:flex text-left">
          <Text className="text-sm font-medium text-foreground leading-none">{user.name}</Text>
          <Text className="text-xs text-muted-foreground leading-none">{user.email}</Text>
        </Space>
      </Button>
    </Dropdown>
  )
}
