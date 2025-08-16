@echo off
echo Starting D Dash Backend Server...
echo.

cd backend

echo Creating .env file if it doesn't exist...
if not exist ".env" (
    copy env.example .env
    echo Created .env file from template
)

echo.
echo Installing dependencies...
npm install

echo.
echo Starting backend server on port 4000...
echo Backend will be available at: https://ss-dash-be.onrender.com
echo Health check: https://ss-dash-be.onrender.com/health
echo.
echo Press Ctrl+C to stop the server
echo.

npm start

pause
