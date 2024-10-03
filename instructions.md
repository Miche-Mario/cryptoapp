# Virtual Cryptocurrency Exchange Platform - Expanded PRD

## Introduction

We are building a virtual cryptocurrency exchange platform where users can have a virtual wallet to buy and sell different cryptocurrencies. This document provides a comprehensive overview of the project requirements, technical specifications, and implementation guidelines.

## Core Functionalities

### 1. Authentication

- Implement Login / Signup functionality
- Buttons for these actions are already provided in the Navbar

### 2. User Dashboard

#### a. Sidebar

Routes:

- Dashboard
- Buy Cryptocurrency
- Wallet

#### b. Top Navbar

- User profile picture
- Dropdown menu to logout

#### c. Main Component

- Displays content based on the selected option in the sidebar

### 3. Admin Dashboard

#### a. Sidebar

Routes:

- Dashboard
- Create Transaction Status
- Manage Users

#### b. Top Navbar

- User profile picture
- Dropdown menu to logout

#### c. Main Component

- Displays content based on the selected option in the sidebar

## Detailed Requirements

### User Dashboard

#### Dashboard

1. Wallet Code Generation

   - Generate a unique 18-character wallet code (numbers and letters) for new users
   - Display the wallet code prominently on the dashboard
   - Ensure the code is not repeated for any other user

2. Current Balance Display

   - Show the current balance with a dollar sign
   - Implement a toggle to hide/show the balance
   - Display the balance in both cryptocurrency and its dollar equivalent

3. Real-time Cryptocurrency Prices
   - Use a free API to fetch and display current cryptocurrency prices
   - Present the data in a table with an appealing UI
   - Implement real-time updates for the prices

#### Buy Cryptocurrency

1. Amount Input

   - Create a number input field for the amount
   - Show the dollar equivalent while typing
   - Label the field as "Amount"

2. Cryptocurrency Selection

   - Implement a dropdown menu for selecting cryptocurrencies
   - Label it as "Crypto Currency"
   - Use the format: "Bitcoin - BTC" (full name - short name)

3. Purchase Confirmation
   - Add a button to confirm the purchase

#### Wallet

1. Balance Display

   - Show the user's wallet balance
   - Include a hide/show toggle
   - Display both cryptocurrency and dollar equivalents

2. Withdrawal Functionality
   - Add a "Withdraw" button
   - Implement a modal with an input field for the withdrawal amount (in dollars)
   - Include a confirmation button in the modal

### Admin Dashboard

#### Dashboard

1. User List

   - Display all users with their wallet codes and balances (in crypto and dollars)
   - Include transaction history for each user

2. Transaction Management
   - Show all user transactions (cryptocurrency name, amount, status, action)
   - Implement a status change button in the "action" column (Pending, Approved, Rejected)
   - Add a balance addition button in the "action" column, opening a modal for input

#### Create Transaction Status

1. Status Creation
   - Provide an input field for new transaction status names
   - Include a confirmation button to add the new status

#### Manage Users

1. User Management
   - Implement a button to delete users

## Technical Specifications

### Technology Stack

- Frontend: NextJS, TailwindCSS, Ant Design (for Forms, Tables, and Modals)
- Styling: Use theme variables created in @global.css or @tailwind.config.ts

### File Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── (auth)/
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── signup/
│   │   │   │       └── page.tsx
│   │   │   ├── (user)/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── buy/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── wallet/
│   │   │   │       └── page.tsx
│   │   │   ├── (admin)/
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── transactions/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── users/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── dashboard/
│   │   │   ├── WalletInfo.tsx
│   │   │   ├── CryptoTable.tsx
│   │   │   └── TransactionHistory.tsx
│   │   ├── forms/
│   │   │   ├── BuyCryptoForm.tsx
│   │   │   └── WithdrawForm.tsx
│   │   └── admin/
│   │       ├── UserList.tsx
│   │       └── TransactionStatusForm.tsx
│   ├── hooks/
│   │   ├── useWallet.ts
│   │   └── useCryptoPrice.ts
│   ├── services/
│   │   ├── api.ts
│   │   └── auth.ts
│   ├── styles/
│   │   └── globals.css
│   └── utils/
│       ├── constants.ts
│       └── helpers.ts
├── public/
│   └── images/
├── messages/
│   ├── en.json
│   └── fr.json
├── tailwind.config.ts
├── next.config.js
└── package.json
```

### Implementation Guidelines

1. Use Next.js 13+ app directory structure for routing and internationalization.
2. Implement route groups ((auth), (user), (admin)) to organize related routes without affecting the URL structure.
3. Utilize Ant Design components for forms, tables, and modals to ensure consistency and speed up development.
4. Create custom hooks (useWallet, useCryptoPrice) to manage wallet state and fetch cryptocurrency prices.
5. Implement responsive design using TailwindCSS, ensuring the application works well on both desktop and mobile devices.
6. Use the messages directory for internationalization, supporting at least English and French languages.

### Example Components

While we won't provide full code implementations, here are some guidelines for key components:

1. WalletInfo.tsx

   - Use Ant Design's Card component to display wallet information
   - Implement a toggle for showing/hiding balance using useState hook
   - Fetch and display real-time cryptocurrency prices using the useCryptoPrice hook

2. BuyCryptoForm.tsx

   - Use Ant Design's Form and Select components
   - Implement real-time dollar equivalent calculation as the user types
   - Use the useWallet hook to handle the purchase transaction

3. UserList.tsx (Admin)
   - Use Ant Design's Table component to display user information
   - Implement action buttons for changing transaction status and adding balance
   - Use modals for confirmation and input of new balances

Remember to maintain a consistent style using the theme variables defined in @global.css or @tailwind.config.ts.

## API Integration

Integrate with a free cryptocurrency price API (e.g., CoinGecko or CryptoCompare) to fetch real-time prices. Create a service in `src/services/api.ts` to handle these API calls.

## Security Considerations

1. Implement proper authentication and authorization checks for all routes, especially admin routes.
2. Use secure practices for handling user balances and transactions.
3. Implement rate limiting for API calls to prevent abuse.

## Testing

1. Implement unit tests for critical components and functions.
2. Create integration tests for key user flows (e.g., buying cryptocurrency, withdrawing balance).
3. Perform thorough testing of admin functionalities to ensure data integrity.

## Deployment

1. Set up a CI/CD pipeline for automated testing and deployment.
2. Use environment variables for sensitive information and API keys.
3. Consider using a service like Vercel for easy deployment of Next.js applications.

This expanded PRD should provide clear alignment for developers implementing the virtual cryptocurrency exchange platform. It includes the file structure, detailed requirements, and implementation guidelines based on the provided documentation.
