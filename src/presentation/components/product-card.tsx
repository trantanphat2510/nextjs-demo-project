"use client"

import type React from "react"
import { Card, Rate, Button, Badge } from "antd"
import { ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons"
import type { Product } from "../../domain/entities/product.entity"

const { Meta } = Card

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
  const isLowStock = product.stock < 10

  return (
    <Card
      hoverable
      className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300"
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            alt={product.name}
            src={product.imageUrl || "/placeholder.svg"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {isLowStock && <Badge.Ribbon text="Low Stock" color="red" className="absolute top-2 right-2" />}
        </div>
      }
      actions={[
        <Button
          key="view"
          type="text"
          icon={<EyeOutlined />}
          onClick={() => onViewDetails(product)}
          className="text-primary hover:text-primary-foreground hover:bg-primary"
        >
          View
        </Button>,
        <Button
          key="cart"
          type="primary"
          icon={<ShoppingCartOutlined />}
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="bg-primary hover:bg-secondary border-primary hover:border-secondary"
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>,
      ]}
    >
      <div className="flex flex-col h-full">
        <Meta
          title={<h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">{product.name}</h3>}
          description={<p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>}
        />

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Rate disabled defaultValue={product.rating} allowHalf className="text-sm" />
              <span className="text-sm text-muted-foreground">({product.reviews})</span>
            </div>
            <Badge count={product.category} style={{ backgroundColor: "#10b981" }} className="text-xs" />
          </div>
        </div>
      </div>
    </Card>
  )
}
