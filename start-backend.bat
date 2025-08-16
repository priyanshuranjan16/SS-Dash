@echo off
echo Starting D Dash Backend Server...
echo.
echo This script will:
echo 1. Navigate to the backend directory
echo 2. Install dependencies (if needed)
echo 3. Start the backend server
echo.
echo Press any key to continue...
pause >nul

cd backend

echo.
echo Checking if node_modules exists...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo Error: Failed to install dependencies
        pause
        exit /b 1
    )
)

echo.
echo Starting backend server...
echo Backend will be available at: https://ss-dash-be.onrender.com
echo Health check: https://ss-dash-be.onrender.com/health
echo.
echo Press Ctrl+C to stop the server
echo.

npm start

pause
