"use client"

import type React from "react"
import { ShoppingCart, LogIn } from "lucide-react"
import { UserMenu } from "./user-menu"
import { ThemeToggle } from "./theme-toggle"
import { User } from "@/src/domain/entities/user.entity"

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
    <header className="bg-amber-50 border-b border-border px-4 md:px-8 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-primary mb-0">ShopDemo</h1>
        </div>

        <div className="flex items-center gap-6">
          <ThemeToggle />

          <button
            onClick={onCartClick}
            className="relative flex items-center text-foreground hover:text-primary hover:bg-muted p-2 rounded-md transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
            <span className="hidden sm:inline ml-2">Cart</span>
          </button>

          {user ? (
            <UserMenu user={user} onLogout={onLogout} onProfile={onProfile} onOrders={onOrders} />
          ) : (
            <button
              onClick={onLoginClick}
              className="flex items-center bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
