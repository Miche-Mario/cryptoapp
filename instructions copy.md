# Cryptocurrency Exchange Platform - Expanded PRD

## 1. Project Overview

### 1.1 Introduction

We are building a virtual cryptocurrency exchange platform where users can have a virtual wallet to buy and sell different cryptocurrencies. Key features include:

- Virtual wallet management
- Cryptocurrency trading
- Real-time price updates
- Admin controls for user management and transaction oversight

### 1.2 Technology Stack

- Frontend: Next.js 13+ (App Router), React
- Styling: TailwindCSS, Ant Design (for forms, tables, and modals)
- Authentication: Clerk
- State Management: React Context API or Redux (TBD based on complexity)
- API: Next.js API Routes

## 2. Detailed Requirements

### 2.1 Authentication (Clerk Integration)

- Implement Clerk for user authentication
- Provide login and signup functionality
- Integrate Clerk components in the Navbar

#### Developer Notes:

- Refer to Clerk documentation for Next.js integration:
  https://clerk.com/docs/quickstarts/nextjs
- Utilize Clerk React hooks:
  - useUser: https://clerk.com/docs/references/react/use-user
  - useAuth: https://clerk.com/docs/references/react/use-auth
  - useSignIn: https://clerk.com/docs/references/react/use-sign-in
  - useSignUp: https://clerk.com/docs/references/react/use-sign-up

### 2.2 User Dashboard

#### 2.2.1 Wallet Generation

- Generate a unique 18-character wallet code for new users
- Display the wallet code prominently on the dashboard
- Ensure uniqueness across all users

#### 2.2.2 Balance Display

- Show current balance in USD and equivalent cryptocurrency amounts
- Implement a toggle to hide/show balance
- Use a free API (e.g., CoinGecko) to fetch real-time cryptocurrency prices

#### 2.2.3 Cryptocurrency Price Table

- Display current prices of various cryptocurrencies
- Implement real-time updates (consider using WebSockets or polling)

#### 2.2.4 Buy Cryptocurrency

- Create a form with:
  - Input field for amount (number input)
  - Dropdown for cryptocurrency selection
  - Real-time USD equivalent display
  - Confirmation button

#### 2.2.5 Wallet Management

- Display user's wallet balance
- Implement a withdraw function with a modal for amount input

### 2.3 Admin Dashboard

#### 2.3.1 User Management

- List all users with their wallet codes and balances
- Implement user deletion functionality
- Allow admins to add balance to user wallets

#### 2.3.2 Transaction Management

- Display all user transactions
- Allow admins to change transaction status (Pending, Approved, Rejected)
- Implement a form to create new transaction status types

## 3. File Structure

```
my-app/
├── public/
│   └── assets/
│       ├── banner.jpg
│       └── banner.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── buy/
│   │   │   └── page.tsx
│   │   ├── wallet/
│   │   │   └── page.tsx
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── dashboard/
│   │       │   └── page.tsx
│   │       ├── manage-users/
│   │       │   └── page.tsx
│   │       └── transaction-status/
│   │           └── page.tsx
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── Dashboard/
│   │   │   ├── WalletInfo.tsx
│   │   │   └── CryptoPrices.tsx
│   │   ├── Transactions/
│   │   │   ├── BuyForm.tsx
│   │   │   └── WithdrawForm.tsx
│   │   └── Admin/
│   │       ├── UserList.tsx
│   │       └── TransactionStatusForm.tsx
│   ├── hooks/
│   │   ├── useWallet.ts
│   │   └── useCryptoPrices.ts
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   └── styles/
│       └── globals.css
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 4. Component Specifications

### 4.1 Navbar (src/components/Layout/Navbar.tsx)

- Integrate Clerk's UserButton for profile picture and logout
- Conditionally render login/signup buttons for non-authenticated users

### 4.2 Sidebar (src/components/Layout/Sidebar.tsx)

- Implement conditional rendering for user/admin routes
- Use Next.js Link component for navigation

### 4.3 WalletInfo (src/components/Dashboard/WalletInfo.tsx)

- Display wallet code and balance
- Implement balance hide/show toggle
- Use Ant Design for styling consistency

### 4.4 CryptoPrices (src/components/Dashboard/CryptoPrices.tsx)

- Fetch and display real-time cryptocurrency prices
- Use Ant Design Table component for display
- Implement WebSocket or polling for real-time updates

### 4.5 BuyForm (src/components/Transactions/BuyForm.tsx)

- Create form using Ant Design Form and Input components
- Implement real-time USD conversion display
- Handle form submission and API call to process purchase

### 4.6 WithdrawForm (src/components/Transactions/WithdrawForm.tsx)

- Create modal form for withdrawal using Ant Design Modal and Form components
- Implement validation for withdrawal amount
- Handle form submission and API call to process withdrawal

### 4.7 UserList (src/components/Admin/UserList.tsx)

- Display user information in an Ant Design Table
- Implement delete user functionality
- Create modal for adding balance to user wallets

### 4.8 TransactionStatusForm (src/components/Admin/TransactionStatusForm.tsx)

- Create form for adding new transaction status types
- Implement form validation and submission handling

## 5. API Endpoints

Implement the following API routes in the `pages/api` directory:

- POST /api/wallet/generate
- GET /api/wallet/balance
- POST /api/transactions/buy
- POST /api/transactions/withdraw
- GET /api/admin/users
- DELETE /api/admin/users/:id
- PATCH /api/admin/users/:id/balance
- GET /api/admin/transactions
- PATCH /api/admin/transactions/:id/status
- POST /api/admin/transaction-status

## 6. State Management

- Implement React Context for global state management
- Create separate contexts for user wallet, cryptocurrency prices, and admin data

## 7. Styling

- Use Tailwind CSS for responsive design and custom styling
- Implement a cohesive color scheme and typography in `tailwind.config.js`
- Use Ant Design components for complex UI elements (forms, tables, modals)

## 8. Testing

- Implement unit tests for utility functions and hooks
- Create integration tests for main user flows (buying, withdrawing, admin actions)
- Use Jest and React Testing Library for test implementation

## 9. Documentation

- Create inline documentation for all components and functions
- Implement Storybook for component documentation and testing

## 10. Deployment

- Set up CI/CD pipeline using GitHub Actions or Vercel
- Configure environment variables for production deployment

## 11. Future Considerations

- Implement real cryptocurrency transactions (requires backend integration with actual exchanges)
- Add more advanced trading features (limit orders, stop-loss)
- Implement user portfolio tracking and performance metrics
