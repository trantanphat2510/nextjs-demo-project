"use client"

import type React from "react"
import { Card, InputNumber, Button, Typography } from "antd"
import { DeleteOutlined } from "@ant-design/icons"
import type { CartItem as CartItemType } from "../../domain/entities/product.entity"

const { Text, Title } = Typography

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  loading?: boolean
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove, loading = false }) => {
  const { product, quantity } = item
  const itemTotal = product.price * quantity

  return (
    <Card className="mb-4 bg-card border-border" bodyStyle={{ padding: "16px" }}>
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-md border border-border"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1 min-w-0 pr-4">
              <Title level={5} className="!mb-1 text-foreground line-clamp-1">
                {product.name}
              </Title>
              <Text type="secondary" className="text-sm line-clamp-2">
                {product.description}
              </Text>
            </div>

            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onRemove(product.id)}
              loading={loading}
              className="flex-shrink-0"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Text className="text-sm text-muted-foreground">Qty:</Text>
                <InputNumber
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={(value) => onUpdateQuantity(product.id, value || 1)}
                  size="small"
                  className="w-20"
                  disabled={loading}
                />
              </div>

              <Text className="text-sm text-muted-foreground">${product.price.toFixed(2)} each</Text>
            </div>

            <div className="text-right">
              <Text strong className="text-lg text-primary">
                ${itemTotal.toFixed(2)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
