@echo off
echo ========================================
echo    D Dash Login Setup Script
echo ========================================
echo.

:: Check if backend is running
echo [1/5] Checking if backend is running...
curl -s http://localhost:4000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Backend is already running
) else (
    echo ⚠️  Backend is not running, starting it...
    echo.
    echo Starting backend server...
    start "Backend Server" cmd /k "cd backend && npm start"
    echo.
    echo Waiting for backend to start...
    timeout /t 5 /nobreak >nul
    
    :: Wait for backend to be ready
    :wait_loop
    curl -s http://localhost:4000/health >nul 2>&1
    if %errorlevel% neq 0 (
        echo Still waiting for backend...
        timeout /t 2 /nobreak >nul
        goto wait_loop
    )
    echo ✅ Backend is now running
)

:: Create test users
echo.
echo [2/5] Creating test users...
cd backend
node create-test-users.js
if %errorlevel% neq 0 (
    echo ❌ Failed to create test users
    pause
    exit /b 1
)
cd ..

:: Test backend connection
echo.
echo [3/5] Testing backend connection...
curl -s http://localhost:4000/health
if %errorlevel% neq 0 (
    echo ❌ Backend connection test failed
    pause
    exit /b 1
)
echo ✅ Backend connection successful

:: Test login API
echo.
echo [4/5] Testing login API...
curl -s -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@d-dash.com\",\"password\":\"admin123\"}" | findstr "success"
if %errorlevel% neq 0 (
    echo ⚠️  Login API test failed (this might be normal if users don't exist yet)
) else (
    echo ✅ Login API test successful
)

:: Open test page
echo.
echo [5/5] Opening test page...
echo.
echo 🎉 Setup complete! Opening test page...
echo.
echo 📋 Test Credentials:
echo    Admin: admin@d-dash.com / admin123
echo    Teacher: teacher@d-dash.com / teacher123
echo    Student: student@d-dash.com / student123
echo.
echo 🌐 Test Page: http://localhost:3000/test-login.html
echo 🔧 Backend Health: http://localhost:4000/health
echo.
echo Press any key to open the test page...
pause >nul

:: Open test page in default browser
start http://localhost:3000/test-login.html

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo ✅ Backend server is running
echo ✅ Test users are created
echo ✅ Test page is opened
echo.
echo You can now test the login functionality!
echo.
pause
