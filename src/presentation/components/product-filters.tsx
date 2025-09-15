"use client"

import type React from "react"
import { Card, Select, Input, Button } from "antd"
import { SearchOutlined, ClearOutlined } from "@ant-design/icons"

const { Option } = Select
const { Search } = Input

interface ProductFiltersProps {
  categories: string[]
  selectedCategory: string
  searchQuery: string
  onCategoryChange: (category: string) => void
  onSearchChange: (query: string) => void
  onClearFilters: () => void
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
  onClearFilters,
}) => {
  return (
    <Card className="mb-6 bg-card border-border">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1 max-w-md">
            <Search
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onSearch={onSearchChange}
              enterButton={<SearchOutlined />}
              size="large"
              className="w-full"
            />
          </div>

          <Select
            value={selectedCategory}
            onChange={onCategoryChange}
            size="large"
            className="w-full sm:w-48"
            placeholder="Select category"
          >
            {categories.map((category) => (
              <Option key={category} value={category}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        <Button
          icon={<ClearOutlined />}
          onClick={onClearFilters}
          size="large"
          className="hover:text-destructive hover:border-destructive"
        >
          Clear Filters
        </Button>
      </div>
    </Card>
  )
}
