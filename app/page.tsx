"use client"

import { useEffect, useState } from "react"
import { Layout, message } from "antd"
import { Header } from "../src/presentation/components/header"
import { ProductFilters } from "../src/presentation/components/product-filters"
import { ProductGrid } from "../src/presentation/components/product-grid"
import { CartDrawer } from "../src/presentation/components/cart-drawer"
import { AuthModal } from "../src/presentation/components/auth-modal"
import { useProductStore } from "../src/presentation/stores/product.store"
import { useCartStore } from "../src/presentation/stores/cart.store"
import { useAuthStore } from "../src/presentation/stores/auth.store"
import { useStoreSync } from "../src/presentation/hooks/use-store-sync"
import type { Product } from "../src/domain/entities/product.entity"

const { Content } = Layout

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "register">("login")

  // Use store sync hook
  const { isAuthenticated, user } = useStoreSync()

  const {
    filteredProducts,
    categories,
    selectedCategory,
    searchQuery,
    loading: productsLoading,
    error: productsError,
    
    filterByCategory,
    searchProducts,
    clearFilters,
  } = useProductStore()

  const {
    items: cartItems,
    total: cartTotal,
    itemCount: cartItemCount,
    isOpen: cartOpen,
    loading: cartLoading,
    error: cartError,
    
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
  } = useCartStore()

  const { isLoading: authLoading, error: authError, login, register, logout, clearError } = useAuthStore()

  useEffect(() => {
    if (productsError) {
      message.error(productsError)
    }
  }, [productsError])

  useEffect(() => {
    if (cartError) {
      message.error(cartError)
    }
  }, [cartError])

  useEffect(() => {
    if (authError) {
      message.error(authError)
    }
  }, [authError])

  const handleAddToCart = async (product: Product) => {
    await addItem({ product, quantity: 1 })
  }

  const handleViewDetails = (product: Product) => {
    message.info(`Viewing details for ${product.name}`)
  }

  const handleCartClick = () => {
    toggleCart()
  }

  const handleLoginClick = () => {
    setAuthMode("login")
    setAuthModalOpen(true)
    clearError()
  }

  const handleAuthModalClose = () => {
    setAuthModalOpen(false)
    clearError()
  }

  const handleLogin = async (email: string, password: string) => {
    await login(email, password)
    if (isAuthenticated) {
      message.success("Login successful!")
      setAuthModalOpen(false)
    }
  }

  const handleRegister = async (email: string, password: string, name: string) => {
    await register(email, password, name)
    if (isAuthenticated) {
      message.success("Registration successful!")
      setAuthModalOpen(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    message.success("Logged out successfully")
  }

  const handleProfile = () => {
    message.info("Profile page will be implemented")
  }

  const handleOrders = () => {
    message.info("Orders page will be implemented")
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      message.warning("Please login to proceed with checkout")
      handleLoginClick()
      return
    }
    message.success("Proceeding to checkout...")
    closeCart()
  }

  return (
    <Layout className="min-h-screen bg-background">
      <Header
        cartItemCount={cartItemCount}
        user={user}
        onCartClick={handleCartClick}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onProfile={handleProfile}
        onOrders={handleOrders}
      />

      <Content className="px-4 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Discover Amazing Products</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Find the perfect items for your needs from our curated collection
            </p>
          </div>

          <ProductFilters
            categories={categories}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onCategoryChange={filterByCategory}
            onSearchChange={searchProducts}
            onClearFilters={clearFilters}
          />

          <ProductGrid
            products={filteredProducts}
            loading={productsLoading}
            onAddToCart={handleAddToCart}
            onViewDetails={handleViewDetails}
          />
        </div>
      </Content>

      <CartDrawer
        open={cartOpen}
        onClose={closeCart}
        items={cartItems}
        total={cartTotal}
        itemCount={cartItemCount}
        loading={cartLoading}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
      />

      <AuthModal
        open={authModalOpen}
        onClose={handleAuthModalClose}
        onLogin={handleLogin}
        onRegister={handleRegister}
        loading={authLoading}
        error={authError}
        initialMode={authMode}
      />
    </Layout>
  )
}
