"use client"

import type React from "react"
import { useState } from "react"
import { Button, InputNumber, Space, message } from "antd"
import { ShoppingCartOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons"
import type { Product } from "../../domain/entities/product.entity"

interface AddToCartButtonProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  loading?: boolean
  showQuantitySelector?: boolean
  size?: "small" | "middle" | "large"
  block?: boolean
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  onAddToCart,
  loading = false,
  showQuantitySelector = false,
  size = "middle",
  block = false,
}) => {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = async () => {
    if (product.stock === 0) {
      message.warning("Product is out of stock")
      return
    }

    if (quantity > product.stock) {
      message.warning(`Only ${product.stock} items available`)
      return
    }

    setIsAdding(true)
    try {
      await onAddToCart(product, quantity)
      message.success(`${product.name} added to cart!`)
      if (!showQuantitySelector) {
        setQuantity(1) // Reset quantity for simple button
      }
    } catch (error) {
      message.error("Failed to add item to cart")
    } finally {
      setIsAdding(false)
    }
  }

  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock < 10

  if (showQuantitySelector) {
    return (
      <Space.Compact className="w-full">
        <Button
          icon={<MinusOutlined />}
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1 || loading || isAdding}
          size={size}
        />
        <InputNumber
          min={1}
          max={product.stock}
          value={quantity}
          onChange={(value) => setQuantity(value || 1)}
          className="flex-1 text-center"
          size={size}
          disabled={loading || isAdding}
        />
        <Button
          icon={<PlusOutlined />}
          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
          disabled={quantity >= product.stock || loading || isAdding}
          size={size}
        />
        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          loading={loading || isAdding}
          disabled={isOutOfStock}
          size={size}
          className="bg-primary hover:bg-secondary border-primary hover:border-secondary"
        >
          Add to Cart
        </Button>
      </Space.Compact>
    )
  }

  return (
    <Button
      type="primary"
      icon={<ShoppingCartOutlined />}
      onClick={handleAddToCart}
      loading={loading || isAdding}
      disabled={isOutOfStock}
      size={size}
      block={block}
      className="bg-primary hover:bg-secondary border-primary hover:border-secondary"
    >
      {isOutOfStock ? "Out of Stock" : isLowStock ? `Add to Cart (${product.stock} left)` : "Add to Cart"}
    </Button>
  )
}
