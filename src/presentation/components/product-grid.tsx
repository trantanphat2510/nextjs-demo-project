"use client"

import type React from "react"
import { Row, Col, Spin, Empty } from "antd"
import { ProductCard } from "./product-card"
import type { Product } from "../../domain/entities/product.entity"

interface ProductGridProps {
  products: Product[]
  loading: boolean
  onAddToCart: (product: Product) => void
  onViewDetails: (product: Product) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, loading, onAddToCart, onViewDetails }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-20">
        <Empty description="No products found" className="text-muted-foreground" />
      </div>
    )
  }

  return (
    <Row gutter={[24, 24]} className="py-6">
      {products.map((product) => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <ProductCard product={product} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
        </Col>
      ))}
    </Row>
  )
}
