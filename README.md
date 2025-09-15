# ShopDemo - Modern Ecommerce Application

A modern ecommerce demo built with Next.js, Clean Architecture, Zustand state management, and a combination of Ant Design and Material UI components.

## Features

- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **State Management**: Zustand with persistence for cart, auth, and global settings
- **Dependency Injection**: Modular and testable architecture
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items with quantity management
- **User Authentication**: Login/register with demo credentials
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Combination of Ant Design and Material UI components

## Architecture

\`\`\`
src/
├── domain/
│   ├── entities/          # Business entities
│   └── repositories/      # Repository interfaces
├── application/
│   └── use-cases/         # Business logic
├── infrastructure/
│   ├── repositories/      # Repository implementations
│   └── di/               # Dependency injection
└── presentation/
    ├── components/        # UI components
    ├── stores/           # Zustand stores
    ├── providers/        # Context providers
    └── hooks/            # Custom hooks
\`\`\`

## Getting Started

1. **Demo Credentials**:
   - Email: `demo@example.com`
   - Password: `password`

2. **Features to Try**:
   - Browse products by category
   - Search for specific items
   - Add items to cart
   - Login with demo credentials
   - Toggle between light/dark themes

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **State Management**: Zustand with persistence
- **UI Libraries**: Ant Design + Material UI
- **Styling**: Tailwind CSS v4
- **Architecture**: Clean Architecture with Dependency Injection
- **TypeScript**: Full type safety

## Key Components

- **Product Catalog**: Grid layout with filtering and search
- **Shopping Cart**: Sliding drawer with quantity management
- **Authentication**: Modal-based login/register forms
- **Theme Toggle**: Light/dark mode support
- **Responsive Header**: Navigation with user menu

## State Management

The application uses Zustand stores with persistence:

- **Product Store**: Product catalog and filtering
- **Cart Store**: Shopping cart with local storage
- **Auth Store**: User authentication state
- **Global Store**: Theme and app settings

## Clean Architecture Benefits

- **Testability**: Business logic separated from UI
- **Maintainability**: Clear boundaries between layers
- **Flexibility**: Easy to swap implementations
- **Scalability**: Modular structure for growth
