# CSCI3100 Project

A web marketplace project built with Rails and React.

## Features

- User registration, login, and logout
- Account information and settings management
- Product listing and product detail pages
- Sell workflow for creating product posts
- Product search and filtering
- Purchase history tracking
- Community page and chat system
- Product image upload and management
- Automated testing with RSpec and Cucumber

## Tech Stack

- Ruby on Rails 8
- SQLite (development)
- React + esbuild
- RSpec + Cucumber

## Quick Start

1. Install dependencies.

```bash
bundle install
npm install
```

2. Set up database.

```bash
bin/rails db:create db:migrate db:seed
```

3. Start development server.

```bash
bin/dev
```

4. Open http://localhost:3000

## Run Tests

```bash
bundle exec rspec
bundle exec cucumber
```

## Feature Ownership Template

This table is required for contribution evaluation. Fill in the names before final submission.

| Feature Name | Primary Developer (Name) | Secondary Developer (Name) | Notes |
|---|---|---|---|
| User Auth and Roles | Chau Wing Fun(wilsoncc04) | [Name] | [Example: Devise and authorization rules] |
| Database Management | [Name] | [Name] | [Short note] |
| Product Listing and Detail | [Name] | [Name] | [Short note] |
| Selling Workflow | [Name] | [Name] | [Short note] |
| Search and Filter | [Name] | [Name] | [Short note] |
| Purchase History | [Name] | [Name] | [Short note] |
| Community | Chau Wing Fun(wilsoncc04) | [Name] | [Short note] |
| Account Settings | [Name] | [Name] | [Short note] |
| Image Management | [Name] | [Name] | [Short note] |
| RSpec Testing | Chau Wing Fun(wilsoncc04) | [Name] | [Short note] |
| User Management | Chau Wing Fun(wilsoncc04) | [Name] | Include: Admin, user, login/register management |
| Platform management | [Name] | [Name] | [Short note] |
| [Template] | [Name] | [Name] | [Short note] |
| Chart.js | [Name] | [Name] | [Short note] |
| Chat | [Name] | [Name] | [Short note] |

