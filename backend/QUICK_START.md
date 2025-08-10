# 🚀 Quick Start Guide - MongoDB & Backend

## Option 1: Docker (Recommended - Easiest)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed

### Steps
1. **Start MongoDB with Docker**:
   ```bash
   cd backend
   docker-compose up -d
   ```

2. **Create .env file**:
   ```bash
   # Copy the example file
   cp env.example .env
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the backend**:
   ```bash
   npm run dev
   ```

5. **Test the setup**:
   - Backend: http://localhost:4000
   - GraphQL: http://localhost:4000/graphql
   - MongoDB Express UI: http://localhost:8081 (admin/password)

## Option 2: Local MongoDB Installation

### Prerequisites
- MongoDB Community Edition installed

### Steps
1. **Start MongoDB**:
   ```bash
   # Windows
   start-mongodb.bat
   
   # macOS/Linux
   ./start-mongodb.sh
   ```

2. **Create .env file**:
   ```bash
   cp env.example .env
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the backend**:
   ```bash
   npm run dev
   ```

## Option 3: MongoDB Atlas (Cloud)

### Steps
1. **Create MongoDB Atlas account**: https://www.mongodb.com/atlas
2. **Create a free cluster**
3. **Get connection string** and update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/d-dash
   ```
4. **Install dependencies and start**:
   ```bash
   npm install
   npm run dev
   ```

## 🧪 Testing Your Setup

### 1. Health Check
```bash
curl http://localhost:4000/health
```

### 2. Test Registration
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Sample Users (if using Docker)
- **Admin**: admin@d-dash.com / admin123
- **Teacher**: teacher@d-dash.com / teacher123
- **Student**: student@d-dash.com / student123

## 🔧 Troubleshooting

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
netstat -an | grep 27017  # Linux/macOS
netstat -an | find "27017"  # Windows

# Check Docker containers
docker ps

# View MongoDB logs
docker logs d-dash-mongodb
```

### Backend Issues
```bash
# Check if port 4000 is available
netstat -an | grep 4000

# View backend logs
npm run dev
```

## 📊 What's Available

### API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Profile**: `/api/profile`, `/api/profile/password`
- **Dashboard**: `/api/dashboard`, `/api/dashboard/admin`
- **GraphQL**: `/graphql` (with GraphiQL playground)
- **Health**: `/health`

### Database Collections
- **users**: User accounts and profiles
- **dashboards**: Dashboard data and analytics

### Features
- ✅ User authentication with JWT
- ✅ Role-based access control
- ✅ Profile management
- ✅ Dashboard analytics
- ✅ GraphQL API
- ✅ REST API
- ✅ File upload support

## 🎯 Next Steps

1. ✅ MongoDB is running
2. ✅ Backend is connected
3. 🔄 Connect frontend to backend
4. 🧪 Test all features
5. 🚀 Deploy to production

Your MongoDB setup is complete! 🎉
