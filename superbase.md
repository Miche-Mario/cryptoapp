# Supabase Integration Guide for Backend Engineers

## Introduction

This document serves as a comprehensive guide for backend engineers to integrate the existing frontend project with Supabase. It outlines the necessary database schemas, authentication mechanisms, and core functionalities required to manage users, wallets, and virtual cryptocurrency transactions within a virtual exchange platform.

## Project Overview

The project is a Virtual Cryptocurrency Exchange Platform built with the following technologies:

- Frontend: Next.js 13+, TailwindCSS, Ant Design
- Authentication: Clerk (to be replaced/integrated with Supabase)
- Backend: Supabase for authentication, database, and real-time functionalities
- State Management: React Context API or Redux
- API Integration: Next.js API Routes to interact with Supabase

Currently, the frontend is fully developed, and the next step involves connecting it to a Supabase backend to handle user authentication, role management, wallet operations, and virtual cryptocurrency transactions.

## Supabase Integration

Supabase provides a robust backend-as-a-service platform that offers authentication, real-time databases, storage, and serverless functions. Integrating Supabase will streamline backend processes, ensuring scalability and security.

### Key Integration Steps:

1. Set Up Supabase Project
2. Design Database Schema
3. Configure Authentication and Authorization
4. Implement API Endpoints
5. Connect Frontend to Supabase
6. Testing and Validation

## Database Schema Design

A well-structured database schema is crucial for efficient data management and retrieval. Below are the core tables required for the application:

### Users

**Table Name:** users

**Description:** Stores user information and roles.

**Fields:**

- id (UUID, Primary Key): Unique identifier for each user.
- email (String, Unique): User's email address.
- password (String): Hashed password (managed by Supabase Auth).
- created_at (Timestamp): Account creation timestamp.
- updated_at (Timestamp): Last update timestamp.

### Roles

**Table Name:** roles

**Description:** Defines user roles within the platform.

**Fields:**

- id (UUID, Primary Key): Unique identifier for each role.
- role_name (String, Unique): Name of the role (e.g., 'user', 'admin').

**Relationship:**

- users table has a foreign key role_id referencing roles.id.

### Wallets

**Table Name:** wallets

**Description:** Manages user wallets and balances.

**Fields:**

- id (UUID, Primary Key): Unique identifier for each wallet.
- user_id (UUID, Foreign Key): References users.id.
- wallet_code (String, Unique): 18-character unique wallet code.
- balance_crypto (Decimal): Cryptocurrency balance.
- balance_usd (Decimal): USD equivalent balance.
- created_at (Timestamp): Wallet creation timestamp.
- updated_at (Timestamp): Last update timestamp.

### Cryptocurrencies

**Table Name:** cryptocurrencies

**Description:** Lists available cryptocurrencies for trading.

**Fields:**

- id (UUID, Primary Key): Unique identifier for each cryptocurrency.
- name (String): Full name of the cryptocurrency (e.g., 'Bitcoin').
- symbol (String, Unique): Ticker symbol (e.g., 'BTC').
- current_price_usd (Decimal): Current price in USD.
- price_change_24h (Decimal): Price change percentage over 24 hours.
- market_cap (Decimal): Market capitalization.
- total_volume (Decimal): Trading volume over 24 hours.
- icon_url (String): URL to the cryptocurrency icon image.

### Transactions

**Table Name:** transactions

**Description:** Records all buy, sell, deposit, and withdrawal transactions.

**Fields:**

- id (UUID, Primary Key): Unique identifier for each transaction.
- user_id (UUID, Foreign Key): References users.id.
- type (Enum): Type of transaction (buy, sell, deposit, withdrawal).
- crypto_id (UUID, Foreign Key, Nullable): References cryptocurrencies.id (applicable for buy/sell).
- amount_crypto (Decimal, Nullable): Amount of cryptocurrency involved.
- amount_usd (Decimal, Nullable): USD equivalent amount.
- status_id (UUID, Foreign Key): References transaction_statuses.id.
- created_at (Timestamp): Transaction creation timestamp.
- updated_at (Timestamp): Last update timestamp.

### Transaction Statuses

**Table Name:** transaction_statuses

**Description:** Defines possible statuses for transactions.

**Fields:**

- id (UUID, Primary Key): Unique identifier for each status.
- status_name (String, Unique): Name of the status (e.g., 'Pending', 'Approved', 'Rejected').

**Relationship:**

- transactions table has a foreign key status_id referencing transaction_statuses.id.

## Authentication and Authorization

Implementing secure authentication and role-based authorization is essential for protecting user data and ensuring that only authorized users can perform specific actions.

### Authentication:

**Provider:** Supabase Auth

**Features:**

- Email and password authentication.
- OAuth providers (optional, based on requirements).
- Password recovery and email verification.

### Authorization:

**Roles:** Implement role-based access control to differentiate between regular users and administrators.

**Policies:**

- Users can:
  - Sign up and log in.
  - View and manage their wallets.
  - Buy cryptocurrencies.
  - Request withdrawals.
- Admins can:
  - View all users and their wallets.
  - Send cryptocurrencies to user wallets.
  - Manage transaction statuses.
  - Approve or reject withdrawal requests.

### Implementation Steps:

1. Define Roles: Populate the roles table with necessary roles (user, admin).
2. Assign Roles: Associate each user with a role in the users table.
3. Access Control: Implement middleware or API route protections based on user roles to restrict access to admin functionalities.

## Backend API Endpoints

Design API endpoints to handle frontend requests, interacting with Supabase databases and ensuring proper authentication and authorization.

### User Management

#### Signup

- **Endpoint:** POST /api/auth/signup
- **Description:** Registers a new user and assigns a default role (user).
- **Input:** email, password
- **Process:**
  1. Create user in Supabase Auth.
  2. Insert user record in users table with role_id referencing user role.
  3. Generate and assign a unique wallet_code in wallets table.

#### Login

- **Endpoint:** POST /api/auth/login
- **Description:** Authenticates a user and returns a session token.
- **Input:** email, password

### Wallet Management

#### Get Wallet Information

- **Endpoint:** GET /api/wallet
- **Description:** Retrieves wallet details for the authenticated user.
- **Authentication:** Required

#### Update Wallet Balance (Admin Only)

- **Endpoint:** PATCH /api/wallet/:userId
- **Description:** Allows admin to add or deduct cryptocurrency from a user's wallet.
- **Input:** amount_crypto, action (add, deduct)
- **Authentication:** Admin role required

### Cryptocurrency Transactions

#### Buy Cryptocurrency

- **Endpoint:** POST /api/transactions/buy
- **Description:** Processes a buy transaction for the authenticated user.
- **Input:** crypto_id, amount_usd
- **Authentication:** Required

#### Request Withdrawal

- **Endpoint:** POST /api/transactions/withdraw
- **Description:** Allows a user to request withdrawal of funds.
- **Input:** amount_usd
- **Authentication:** Required

#### Get User Transactions

- **Endpoint:** GET /api/transactions
- **Description:** Retrieves all transactions for the authenticated user.
- **Authentication:** Required

### Admin Operations

#### Get All Users

- **Endpoint:** GET /api/admin/users
- **Description:** Retrieves a list of all registered users.
- **Authentication:** Admin role required

#### Get All Transactions

- **Endpoint:** GET /api/admin/transactions
- **Description:** Retrieves all transactions across the platform.
- **Authentication:** Admin role required

#### Update Transaction Status

- **Endpoint:** PATCH /api/admin/transactions/:transactionId/status
- **Description:** Allows admin to approve or reject a transaction.
- **Input:** status_id
- **Authentication:** Admin role required

#### Create New Transaction Status

- **Endpoint:** POST /api/admin/transaction-statuses
- **Description:** Enables admin to add new transaction status types.
- **Input:** status_name
- **Authentication:** Admin role required

## Supabase Configuration

Proper configuration of Supabase is essential to ensure seamless integration with the frontend and secure data management.

### Setting Up Supabase Project

1. Create a Supabase Account: If you haven't already, sign up at Supabase.
2. Create a New Project: Set up a new project in the Supabase dashboard.
3. Configure API Settings: Note the API URL and API Key for frontend integration.

### Environment Variables

Store sensitive information securely using environment variables. Update your frontend project's .env file with Supabase credentials.

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Note:**

- `NEXT_PUBLIC_` prefix exposes variables to the browser. Use cautiously.
- Keep `SUPABASE_SERVICE_ROLE_KEY` secure and do not expose it on the frontend.

### Client Integration

Integrate Supabase client into the Next.js application to interact with the Supabase backend.

1. Install Supabase Client:

```bash
npm install @supabase/supabase-js
```

2. Initialize Supabase Client:

Create a `supabaseClient.ts` file in the `src/lib/` directory.

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Authentication Handling:

Utilize Supabase Auth methods for login, signup, and session management within your frontend components.

## Deployment Considerations

Ensure that both frontend and Supabase backend are correctly configured for production deployment.

### Environment Variables:

- Securely manage environment variables in your deployment platform (e.g., Vercel, Netlify).
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` publicly.

### Database Migrations:

- Use Supabase's SQL editor or migration tools to set up and manage database schemas.
- Implement version control for database schema changes.

### CI/CD Pipeline:

- Automate testing and deployment processes.
- Integrate Supabase migrations into the CI/CD pipeline to ensure database consistency.

### Performance Optimization:

- Leverage Supabase's real-time capabilities judiciously to minimize unnecessary load.
- Optimize database queries and indexing for faster data retrieval.

## Security Considerations

Maintaining robust security measures is paramount to protect user data and ensure the integrity of transactions.

### Authentication Security:

- Enforce strong password policies.
- Enable multi-factor authentication (optional for added security).

### Authorization Rules:

- Implement Row-Level Security (RLS) in Supabase to restrict data access based on user roles.
- Define RLS policies to ensure users can only access their own data, while admins have broader access.

### Data Validation:

- Validate all inputs on both frontend and backend to prevent SQL injection and other attacks.
- Sanitize data before storing it in the database.

### Secure API Keys:

- Store API keys and sensitive information securely using environment variables.
- Rotate keys regularly and revoke compromised keys immediately.

### Rate Limiting:

- Implement rate limiting on API endpoints to prevent abuse and brute-force attacks.

### HTTPS Enforcement:

- Ensure all communications between frontend and backend occur over HTTPS to protect data in transit.
