# 🔐 Login Troubleshooting Guide

This guide helps you resolve common login issues in the D Dash application.

## 🚨 Common Symptoms

- **"Failed to load resource: 400 (Bad Request)"** error
- **"Backend server is not accessible"** message
- **Login button not working** after logout
- **"Invalid email or password"** with correct credentials
- **Page redirects to login** after successful authentication

## 🔍 Root Causes & Solutions

### 1. Backend Server Not Running

**Symptoms:**
- "Backend server is not accessible" error
- Network connection errors
- Health check fails

**Solution:**
```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not done)
npm install

# Start the server
npm start

# Or for development with auto-restart
npm run dev
```

**Verify:**
- Check `http://localhost:4000/health` in browser
- Should return: `{"status":"ok","timestamp":"...","uptime":...,"environment":"development"}`

### 2. Database Connection Issues

**Symptoms:**
- Login fails with database errors
- "Internal server error" messages

**Solution:**
```bash
# Start MongoDB (if using Docker)
docker-compose up -d

# Or start MongoDB locally
mongod

# Create test users
node create-test-users.js
```

### 3. Invalid Request Format

**Symptoms:**
- 400 Bad Request errors
- "Validation failed" messages

**Solution:**
- Ensure login form sends only `email` and `password`
- Remove any `role` field from login requests
- Check browser console for request payload

### 4. Password Hash Issues

**Symptoms:**
- "Invalid email or password" with correct credentials
- Authentication fails after password changes

**Solution:**
```bash
# Recreate test users with proper password hashes
cd backend
node create-test-users.js
```

### 5. CORS Issues

**Symptoms:**
- Network errors in browser console
- "Failed to fetch" errors

**Solution:**
- Ensure backend CORS is configured for `http://localhost:3000`
- Check backend server is running on port 4000
- Verify frontend is running on port 3000

## 🧪 Test Credentials

Use these credentials for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@d-dash.com` | `admin123` |
| Teacher | `teacher@d-dash.com` | `teacher123` |
| Student | `student@d-dash.com` | `student123` |

## 🛠️ Testing Tools

### 1. Backend Health Check
```bash
curl http://localhost:4000/health
```

### 2. Test Login API
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@d-dash.com","password":"admin123"}'
```

### 3. Frontend Test Page
Open `frontend/test-login.html` in browser for interactive testing.

## 🔄 Fallback Mechanism

The application includes a **dummy authentication fallback** when the backend is unavailable:

1. **Automatic Detection**: Frontend detects backend unavailability
2. **Dummy Login**: Uses hardcoded credentials for testing
3. **Local Storage**: Stores authentication state locally
4. **Dashboard Access**: Allows access to dashboards with dummy data

**Dummy Credentials:**
- Same as test credentials above
- Works without backend server
- Provides full dashboard functionality

## 🐛 Debugging Steps

### Step 1: Check Backend Status
```bash
# Check if backend is running
curl http://localhost:4000/health

# Check if MongoDB is accessible
curl http://localhost:4000/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

### Step 2: Check Frontend Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Try to login
4. Look for error messages

### Step 3: Check Network Tab
1. Open browser developer tools (F12)
2. Go to Network tab
3. Try to login
4. Check request/response details

### Step 4: Verify Token Storage
```javascript
// In browser console
console.log('Cookie token:', document.cookie);
console.log('LocalStorage token:', localStorage.getItem('token'));
console.log('User data:', localStorage.getItem('user'));
```

### Step 5: Clear All Data
```javascript
// In browser console
localStorage.clear();
sessionStorage.clear();
document.cookie.split(";").forEach(function(c) { 
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
});
```

## 🔧 Advanced Troubleshooting

### Database Issues
```bash
# Check MongoDB connection
mongo d-dash --eval "db.users.find().pretty()"

# Reset database
mongo d-dash --eval "db.dropDatabase()"
node create-test-users.js
```

### Port Conflicts
```bash
# Check what's using port 4000
netstat -ano | findstr :4000  # Windows
lsof -i :4000                 # Mac/Linux

# Kill process if needed
taskkill /PID <PID> /F        # Windows
kill -9 <PID>                 # Mac/Linux
```

### Environment Variables
Ensure `.env` file exists in backend directory:
```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/d-dash
JWT_SECRET=your-super-secret-jwt-key
CORS_ORIGIN=http://localhost:3000
```

## 📞 Getting Help

If issues persist:

1. **Check logs**: Look at backend console output
2. **Test step-by-step**: Use the test tools above
3. **Clear cache**: Clear browser cache and storage
4. **Restart services**: Restart both frontend and backend
5. **Check versions**: Ensure all dependencies are up to date

## 🎯 Quick Fix Checklist

- [ ] Backend server running on port 4000
- [ ] MongoDB running and accessible
- [ ] Test users created with `node create-test-users.js`
- [ ] Frontend running on port 3000
- [ ] No CORS errors in browser console
- [ ] Using correct test credentials
- [ ] Browser cache cleared
- [ ] All environment variables set

## 🔄 Reset Everything

If all else fails, reset the entire setup:

```bash
# Backend
cd backend
npm install
node create-test-users.js
npm start

# Frontend (in new terminal)
cd frontend
npm install
npm run dev

# Clear browser data
# Open test page: http://localhost:3000/test-login.html
```
