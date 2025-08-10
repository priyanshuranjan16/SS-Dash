# MongoDB Setup Guide for D Dash Backend

## 🎉 Good News: MongoDB is Already Integrated!

Your backend already has MongoDB fully integrated with:
- ✅ Mongoose ODM for data modeling
- ✅ User and Dashboard models
- ✅ Database connection configuration
- ✅ Authentication and authorization
- ✅ GraphQL and REST API endpoints

## 📋 What's Already Set Up

### 1. Dependencies (in package.json)
```json
{
  "mongoose": "^8.0.3",
  "fastify-mongodb": "^5.0.0"
}
```

### 2. Database Configuration
- **File**: `src/config/database.js`
- **Connection**: MongoDB with Mongoose
- **Features**: Connection pooling, error handling, graceful shutdown

### 3. Models
- **User Model** (`src/models/User.js`): Complete user schema with authentication
- **Dashboard Model** (`src/models/Dashboard.js`): Dashboard data and analytics

### 4. Environment Variables
Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/d-dash
MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/d-dash

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# File Upload Configuration
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Getting Started

### Option 1: Local MongoDB Installation

1. **Install MongoDB Community Edition**:
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **macOS**: `brew install mongodb-community`
   - **Ubuntu**: `sudo apt install mongodb`

2. **Start MongoDB Service**:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Ubuntu
   sudo systemctl start mongod
   ```

3. **Verify Installation**:
   ```bash
   mongosh
   # or
   mongo
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create Free Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Choose the free tier
3. **Get Connection String**: Replace the `MONGODB_URI_PROD` in your `.env`
4. **Whitelist IP**: Add your IP address to the whitelist

### Option 3: Docker (Recommended for Development)

1. **Install Docker**: [Docker Desktop](https://www.docker.com/products/docker-desktop)

2. **Run MongoDB Container**:
   ```bash
   docker run -d \
     --name mongodb \
     -p 27017:27017 \
     -e MONGO_INITDB_ROOT_USERNAME=admin \
     -e MONGO_INITDB_ROOT_PASSWORD=password \
     -v mongodb_data:/data/db \
     mongo:latest
   ```

3. **Update .env** (if using Docker with auth):
   ```env
   MONGODB_URI=mongodb://admin:password@localhost:27017/d-dash?authSource=admin
   ```

## 🛠️ Running the Backend

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Start the Server**:
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

3. **Verify Connection**:
   - Check console for: `✅ Connected to MongoDB successfully`
   - Visit: `http://localhost:4000/health`

## 📊 Database Features

### User Management
- ✅ User registration and login
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (student, teacher, admin)
- ✅ Profile management
- ✅ Avatar upload support

### Dashboard Analytics
- ✅ Real-time metrics
- ✅ Chart data generation
- ✅ Activity logging
- ✅ Role-specific dashboards

### API Endpoints
- ✅ REST API: `/api/auth/*`, `/api/profile/*`, `/api/dashboard/*`
- ✅ GraphQL: `/graphql` with GraphiQL playground
- ✅ Health check: `/health`

## 🔧 Database Operations

### Using MongoDB Compass (GUI)
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `d-dash` database

### Using Command Line
```bash
# Connect to MongoDB
mongosh

# Switch to database
use d-dash

# View collections
show collections

# Query users
db.users.find()

# Query dashboards
db.dashboards.find()
```

## 🧪 Testing the Setup

1. **Test Registration**:
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

2. **Test Login**:
   ```bash
   curl -X POST http://localhost:4000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   ```

3. **Test Dashboard** (with auth token):
   ```bash
   curl -X GET http://localhost:4000/api/dashboard \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
   ```

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Input validation with Joi
- ✅ CORS configuration
- ✅ Environment variable protection

## 📈 Production Deployment

For production, consider:
1. **MongoDB Atlas** for managed database
2. **Environment Variables** for sensitive data
3. **Connection Pooling** for performance
4. **Backup Strategy** for data safety
5. **Monitoring** with MongoDB Cloud Manager

## 🆘 Troubleshooting

### Common Issues:

1. **Connection Refused**:
   - Check if MongoDB is running
   - Verify port 27017 is not blocked
   - Check firewall settings

2. **Authentication Failed**:
   - Verify connection string
   - Check username/password
   - Ensure database exists

3. **Permission Denied**:
   - Check file permissions for uploads
   - Verify database user permissions

### Debug Mode:
```bash
# Enable debug logging
DEBUG=mongoose:* npm run dev
```

## 🎯 Next Steps

1. ✅ MongoDB is integrated and ready
2. 🔄 Create `.env` file with your configuration
3. 🚀 Start MongoDB service
4. 🏃‍♂️ Run `npm run dev` in backend directory
5. 🌐 Test API endpoints
6. 🔗 Connect frontend to backend

Your MongoDB setup is complete and ready to use! 🎉
