"use client"

import type React from "react"
import { Drawer, Button, Typography, Divider, Empty, Space, Spin } from "antd"
import { ShoppingCartOutlined, ClearOutlined } from "@ant-design/icons"
import { CartItem } from "./cart-item"
import type { CartItem as CartItemType } from "../../domain/entities/product.entity"

const { Title, Text } = Typography

interface CartDrawerProps {
  open: boolean
  onClose: () => void
  items: CartItemType[]
  total: number
  itemCount: number
  loading: boolean
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onClearCart: () => void
  onCheckout: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  onClose,
  items,
  total,
  itemCount,
  loading,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}) => {
  const isEmpty = items.length === 0

  return (
    <Drawer
      title={
        <div className="flex items-center gap-2">
          <ShoppingCartOutlined />
          <span>Shopping Cart ({itemCount})</span>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={400}
      className="cart-drawer"
      extra={
        !isEmpty && (
          <Button type="text" danger icon={<ClearOutlined />} onClick={onClearCart} loading={loading} size="small">
            Clear All
          </Button>
        )
      }
    >
      {loading && isEmpty ? (
        <div className="flex justify-center items-center py-20">
          <Spin size="large" />
        </div>
      ) : isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-muted-foreground">Your cart is empty</span>}
          />
          <Button type="primary" onClick={onClose} className="mt-4">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemoveItem}
                loading={loading}
              />
            ))}
          </div>

          <div className="border-t border-border pt-4 mt-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <Text>Subtotal:</Text>
                <Text>${total.toFixed(2)}</Text>
              </div>
              <div className="flex justify-between items-center">
                <Text>Shipping:</Text>
                <Text>Free</Text>
              </div>
              <Divider className="my-2" />
              <div className="flex justify-between items-center">
                <Title level={4} className="!mb-0">
                  Total:
                </Title>
                <Title level={4} className="!mb-0 text-primary">
                  ${total.toFixed(2)}
                </Title>
              </div>
            </div>

            <Space direction="vertical" className="w-full">
              <Button
                type="primary"
                size="large"
                block
                onClick={onCheckout}
                className="bg-primary hover:bg-secondary border-primary hover:border-secondary"
              >
                Proceed to Checkout
              </Button>
              <Button type="default" size="large" block onClick={onClose}>
                Continue Shopping
              </Button>
            </Space>
          </div>
        </div>
      )}
    </Drawer>
  )
}
