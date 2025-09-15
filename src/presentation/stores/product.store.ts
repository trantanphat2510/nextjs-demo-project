import { create } from "zustand"
import type { Product } from "../../domain/entities/product.entity"
import type { ProductUseCases } from "../../application/use-cases/product.use-cases"
import { container } from "../../infrastructure/di/container"

interface ProductState {
  products: Product[]
  filteredProducts: Product[]
  categories: string[]
  selectedCategory: string
  searchQuery: string
  loading: boolean
  error: string | null

  // Actions
  loadProducts: () => Promise<void>
  filterByCategory: (category: string) => void
  searchProducts: (query: string) => void
  clearFilters: () => void
}

export const useProductStore = create<ProductState>((set, get) => {
  const productUseCases = container.resolve<ProductUseCases>("ProductUseCases")

  return {
    products: [],
    filteredProducts: [],
    categories: [],
    selectedCategory: "All",
    searchQuery: "",
    loading: false,
    error: null,

    loadProducts: async () => {
      set({ loading: true, error: null })
      try {
        const products = await productUseCases.getAllProducts()
        const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

        set({
          products,
          filteredProducts: products,
          categories,
          loading: false,
        })
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Failed to load products",
          loading: false,
        })
      }
    },

    filterByCategory: (category: string) => {
      const { products, searchQuery } = get()
      let filtered = category === "All" ? products : products.filter((p) => p.category === category)

      if (searchQuery) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      set({ selectedCategory: category, filteredProducts: filtered })
    },

    searchProducts: (query: string) => {
      const { products, selectedCategory } = get()
      let filtered = selectedCategory === "All" ? products : products.filter((p) => p.category === selectedCategory)

      if (query) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()),
        )
      }

      set({ searchQuery: query, filteredProducts: filtered })
    },

    clearFilters: () => {
      const { products } = get()
      set({
        selectedCategory: "All",
        searchQuery: "",
        filteredProducts: products,
      })
    },
  }
})
