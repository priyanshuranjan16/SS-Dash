# D Dash - Role-Based Dashboard Application

A modern, full-stack web application featuring role-based access control (RBAC) with dedicated dashboards for Students, Teachers, and Administrators. Built with Next.js, Fastify, MongoDB, and modern UI components.

## 🚀 Features

### Authentication & Authorization
- **Role-Based Access Control (RBAC)**: Three distinct user roles (Student, Teacher, Admin)
- **Protected Routes**: Middleware-based route protection with automatic redirects
- **JWT Authentication**: Secure token-based authentication with cookies
- **Automatic Role-Based Redirection**: Users are redirected to their specific dashboards after login

### Dashboard Features
- **Student Dashboard**: Academic progress tracking, course analytics, grade distribution, study hours, attendance trends
- **Teacher Dashboard**: Student performance analytics, course management, teaching efficiency metrics, grade distribution
- **Admin Dashboard**: System-wide analytics, user management, platform performance, revenue tracking, security metrics

### UI/UX Features
- **Modern Design**: Clean, purple and black theme with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Charts**: Rich data visualization using Recharts (bar charts, line charts, pie charts, radar charts, area charts)
- **Smooth Animations**: Framer Motion integration for delightful user interactions
- **Real-time Updates**: Dynamic data filtering and search functionality



## 🛠 Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components built on Radix UI
- **Framer Motion**: Animation library for React
- **Recharts**: Composable charting library
- **React Hook Form**: Form management with Zod validation
- **Lucide React**: Beautiful icon library

### Backend
- **Node.js**: JavaScript runtime
- **Fastify**: High-performance web framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **JWT**: JSON Web Tokens for authentication
- **Apollo GraphQL**: GraphQL API implementation
- **bcryptjs**: Password hashing




## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for MongoDB)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd D-Dash
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install



# Start the development server
node src/server.js
```

The backend will be running on `http://localhost:3001`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be running on `http://localhost:3000`

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **GraphQL Playground**: http://localhost:3001/graphql





### Default Credentials

For testing purposes, you can use these email patterns:
- **Student**: `student@example.com`
- **Teacher**: `teacher@example.com`
- **Admin**: `admin@example.com`

Or simply use any email with the role selection dropdown.



## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/d-dash

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Frontend Configuration

The frontend uses Next.js configuration with:
- TypeScript strict mode enabled
- Path aliases configured (`@/` points to project root)
- Tailwind CSS with custom theme
- Framer Motion for animations




**Built with ❤️ using Next.js, Fastify, and MongoDB**
