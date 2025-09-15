"use client"

import type React from "react"
import { Layout, Badge, Button, Space, Typography } from "antd"
import { ShoppingCartOutlined, LoginOutlined } from "@ant-design/icons"
import { UserMenu } from "./user-menu"
import { ThemeToggle } from "./theme-toggle"
import type { User } from "../../domain/entities/user.entity"

const { Header: AntHeader } = Layout
const { Title } = Typography

interface HeaderProps {
  cartItemCount: number
  user: User | null
  onCartClick: () => void
  onLoginClick: () => void
  onLogout: () => void
  onProfile: () => void
  onOrders: () => void
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  user,
  onCartClick,
  onLoginClick,
  onLogout,
  onProfile,
  onOrders,
}) => {
  return (
    <AntHeader className="bg-amber-50 border-b border-border px-4 md:px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <Title level={2} className="!mb-0 !text-primary font-bold">
            ShopDemo
          </Title>
        </div>

        <Space size="large">
          <ThemeToggle />

          <Button type="text"
            icon={
              <Badge count={cartItemCount} size="small" offset={[10, 0]}>
                <ShoppingCartOutlined className="text-xl " />
              </Badge>
            }
            onClick={onCartClick}
            className="flex items-center text-white hover:text-white hover:bg-muted"
          >
            <span className="hidden sm:inline ml-2 text-white">Cart</span>
          </Button>

          {user ? (
            <UserMenu user={user} onLogout={onLogout} onProfile={onProfile} onOrders={onOrders} />
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={onLoginClick}
              className="bg-primary hover:bg-secondary border-primary hover:border-secondary"
            >
              <span className="hidden sm:inline ml-2">Login</span>
            </Button>
          )}
        </Space>
      </div>
    </AntHeader>
  )
}
