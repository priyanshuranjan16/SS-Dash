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

### Profile Management
- **Role-Based Profiles**: Different profile sections based on user role
- **Avatar Upload**: Image upload and preview functionality
- **Form Validation**: Client-side validation with Zod schema
- **Security Settings**: Password change and account management

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
- **Joi**: Input validation
- **Docker Compose**: Local MongoDB setup

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **nodemon**: Development server auto-restart


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

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB using Docker
docker-compose up -d

# Start the development server
npm run dev
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

## 📁 Project Structure

```
D-Dash/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App Router pages and layouts
│   │   ├── (auth)/          # Authentication pages
│   │   ├── dashboard/       # Student dashboard
│   │   ├── teacher/         # Teacher dashboard
│   │   ├── admin/           # Admin dashboard
│   │   └── profile/         # User profile page
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   └── ui/             # shadcn/ui components
│   ├── contexts/           # React contexts (AuthContext)
│   └── lib/                # Utility functions
├── backend/                 # Fastify backend application
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose schemas
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Authentication middleware
│   │   ├── graphql/        # GraphQL schema and resolvers
│   │   └── utils/          # Utility functions
│   └── docker-compose.yml  # MongoDB setup
└── README.md               # This file
```

## 🔐 Authentication & Roles

### User Roles

1. **Student**
   - Access to student dashboard
   - View academic progress, grades, attendance
   - Profile management
   - Course enrollment tracking

2. **Teacher**
   - Access to teacher dashboard
   - View student performance analytics
   - Course management tools
   - Grade distribution analysis

3. **Admin**
   - Access to admin dashboard
   - System-wide analytics
   - User management
   - Platform performance monitoring

### Default Credentials

For testing purposes, you can use these email patterns:
- **Student**: `student@example.com`
- **Teacher**: `teacher@example.com`
- **Admin**: `admin@example.com`

Or simply use any email with the role selection dropdown.

## 🎨 UI Components

The application uses a custom purple and black theme with the following design tokens:

- **Primary Colors**: Purple gradients and accents
- **Background**: Dark theme with subtle contrasts
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent 8px grid system
- **Animations**: Smooth transitions and micro-interactions

## 📊 Data Visualization

The dashboards feature various chart types:

- **Bar Charts**: Course progress, performance metrics
- **Line Charts**: Trends over time, attendance patterns
- **Area Charts**: Study hours, system performance
- **Pie Charts**: Grade distribution, user demographics
- **Radar Charts**: Skills assessment, competency mapping
- **Funnel Charts**: User conversion flows

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

## 🧪 Testing

The project includes testing setup but tests are not yet implemented:

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment

1. Set up MongoDB Atlas or use Docker
2. Configure environment variables
3. Deploy to your preferred platform (Vercel, Railway, Heroku)

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Configure environment variables for API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 Assumptions

### Technical Assumptions
- **Modern Browsers**: Application targets modern browsers with ES6+ support
- **JavaScript Enabled**: Requires JavaScript for full functionality
- **Network Connectivity**: Assumes stable internet connection for API calls
- **Local Storage**: Uses cookies for authentication tokens
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Business Assumptions
- **Educational Context**: Designed for educational institutions
- **Role Hierarchy**: Clear separation between student, teacher, and admin roles
- **Data Privacy**: User data is handled according to privacy regulations
- **Scalability**: Architecture supports growth and additional features
- **Real-time Updates**: Dashboard data reflects current academic status

### User Experience Assumptions
- **Intuitive Navigation**: Users can easily navigate between different sections
- **Role Awareness**: Users understand their role and associated permissions
- **Data Accuracy**: Displayed metrics and analytics are accurate and up-to-date
- **Accessibility**: Application follows accessibility guidelines
- **Performance**: Fast loading times and smooth interactions

## 🐛 Known Issues

- Pie chart labels may have visibility issues in certain themes
- Some animations may cause performance issues on older devices
- MongoDB connection requires Docker to be running

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in the `/docs` folder
- Review the error handling documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with ❤️ using Next.js, Fastify, and MongoDB**
