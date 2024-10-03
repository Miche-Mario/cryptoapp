# Virtual Cryptocurrency Exchange Platform - Expanded PRD (Updated)

## Introduction

We are building a virtual cryptocurrency exchange platform where users can have a virtual wallet to buy and sell different cryptocurrencies. This document provides a comprehensive overview of the project requirements, technical specifications, and implementation guidelines.

## Core Functionalities

### 1. Authentication

- Implement Login / Signup functionality
- Buttons for these actions are already provided in the Navbar

Dashboard Layout Structure
Both the user and admin dashboards follow a consistent layout structure composed of three main elements: Navbar, Sidebar, and Main Content. This structure ensures a uniform user experience and simplifies navigation throughout the application.
Layout Composition

Navbar (Top)

Spans the full width of the page at the top
Contains the user profile picture and logout dropdown
Consistent across all pages for both user and admin dashboards

Sidebar (Left)

Occupies the left side of the page below the Navbar
Contains navigation links specific to user or admin roles
Remains visible and accessible on all dashboard pages

Main Content (Right)

Occupies the larger right portion of the page
Displays content based on the selected sidebar navigation item
Changes dynamically without reloading the entire page

User Dashboard Structure
Navbar

User profile picture
Dropdown menu to logout

Sidebar

Wallet
Buy
Withdraw

Main Content
Changes based on the selected sidebar item:

Wallet: Displays wallet information, balance, and transaction history
Buy: Shows the cryptocurrency purchase form
Withdraw: Presents the withdrawal form

Admin Dashboard Structure
Navbar

Admin profile picture
Dropdown menu to logout

Sidebar

UserList
Transaction Status

Main Content
Changes based on the selected sidebar item:

UserList: Displays the list of all users and their details
Transaction Status: Shows all transactions and status management options

Implementation Guidelines for Layout Structure

Use Next.js Layout Pattern

Create a layout component that includes the Navbar and Sidebar
Use this layout component as a wrapper for all dashboard pages

Dynamic Routing

Implement dynamic routing to change the Main Content based on the selected sidebar item
Use Next.js's built-in routing capabilities to handle this efficiently

State Management

Use React's Context API or a state management library like Redux to manage the active sidebar item
This ensures the correct content is displayed in the Main Content area

Responsive Design

Implement a responsive design that adapts the layout for different screen sizes
Consider a collapsible sidebar for mobile views

Here's an example of how the layout component might be structured:
tsxCopy// src/components/layout/DashboardLayout.tsx

import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
children: React.ReactNode;
sidebarItems: Array<{ label: string; route: string }>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, sidebarItems }) => {
return (
<div className="flex flex-col h-screen">
<Navbar />
<div className="flex flex-1 overflow-hidden">
<Sidebar items={sidebarItems} />
<main className="flex-1 overflow-y-auto p-4">
{children}
</main>
</div>
</div>
);
};

export default DashboardLayout;
This layout component can then be used in your page components:
tsxCopy// src/app/[locale]/(user)/wallet/page.tsx

import DashboardLayout from '@/components/layout/DashboardLayout';
import WalletContent from '@/components/user/WalletContent';

const userSidebarItems = [
{ label: 'Wallet', route: '/wallet' },
{ label: 'Buy', route: '/buy' },
{ label: 'Withdraw', route: '/withdraw' },
];

const WalletPage = () => {
return (
<DashboardLayout sidebarItems={userSidebarItems}>
<WalletContent />
</DashboardLayout>
);
};

export default WalletPage;
By using this layout structure, you ensure consistency across the application while allowing the main content to change dynamically based on user navigation. The sidebar remains constant within each dashboard (user or admin), providing easy access to all main features, while the main content area updates to reflect the selected item.

### 2. User Dashboard

#### a. Top Navbar

- User profile picture
- Dropdown menu to logout

#### b. Sidebar

Routes:

- Wallet
- Buy
- Withdraw

#### c. Main Component

- Displays content based on the selected option in the sidebar

### 3. Admin Dashboard

#### a. Top Navbar

- User profile picture
- Dropdown menu to logout

#### b. Sidebar

Routes:

- UserList
- Transaction Status

#### c. Main Component

- Displays content based on the selected option in the sidebar

## Detailed Requirements

### User Dashboard

#### Wallet

1. Wallet Code Display

   - Display the unique 18-character wallet code (numbers and letters) for the user
   - Ensure the code is not repeated for any other user

2. Current Balance Display

   - Show the current balance with a dollar sign
   - Implement a toggle to hide/show the balance
   - Display the balance in both cryptocurrency and its dollar equivalent

3. Real-time Cryptocurrency Prices

   - Use a free API to fetch and display current cryptocurrency prices
   - Present the data in a table with an appealing UI
   - Implement real-time updates for the prices

4. Transaction History
   - Display recent transactions
   - Include details such as transaction type, amount, and date

#### Buy

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

#### Withdraw

1. Withdrawal Amount Input

   - Create an input field for the withdrawal amount (in dollars)
   - Show the cryptocurrency equivalent while typing

2. Withdrawal Confirmation
   - Add a button to confirm the withdrawal
   - Implement a confirmation modal before processing the withdrawal

### Admin Dashboard

#### UserList

1. User List Display

   - Show a table of all users with columns for:
     - User ID
     - Wallet Code
     - Current Balance (in crypto and dollars)
     - Registration Date
   - Implement sorting and filtering options

2. User Details

   - Add a button to view detailed information for each user
   - Display user's transaction history in a modal or separate page

3. Balance Management
   - Implement a feature to add or deduct balance for any user
   - Use a modal for input and confirmation

#### Transaction Status

1. Transaction List

   - Display all transactions across the platform
   - Include columns for:
     - Transaction ID
     - User
     - Type (Buy/Sell/Withdraw)
     - Amount
     - Status
     - Date

2. Status Management

   - Add ability to change transaction status (Pending, Approved, Rejected)
   - Implement a dropdown or buttons for status change

3. Transaction Status Creation
   - Provide an input field to create new transaction status types
   - Include a confirmation button to add the new status

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
│   │   │   │   ├── wallet/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── buy/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── withdraw/
│   │   │   │       └── page.tsx
│   │   │   ├── (admin)/
│   │   │   │   ├── user-list/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── transaction-status/
│   │   │   │       └── page.tsx
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── user/
│   │   │   ├── WalletInfo.tsx
│   │   │   ├── CryptoTable.tsx
│   │   │   ├── TransactionHistory.tsx
│   │   │   ├── BuyForm.tsx
│   │   │   └── WithdrawForm.tsx
│   │   └── admin/
│   │       ├── UserList.tsx
│   │       └── TransactionStatusManager.tsx
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

2. BuyForm.tsx

   - Use Ant Design's Form and Select components
   - Implement real-time dollar equivalent calculation as the user types
   - Use the useWallet hook to handle the purchase transaction

3. UserList.tsx (Admin)

   - Use Ant Design's Table component to display user information
   - Implement action buttons for viewing user details and managing balance
   - Use modals for confirmation and input of new balances

4. TransactionStatusManager.tsx (Admin)
   - Use Ant Design's Table for displaying transactions
   - Implement dropdown or buttons for changing transaction status
   - Include a form for creating new transaction status types

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

This updated PRD reflects the correct structure for both user and admin dashboards, with accurate sidebar navigation and main content areas.
