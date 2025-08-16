@echo off
echo Starting D Dash Backend Server...
echo.
echo Make sure MongoDB is running first!
echo.

cd backend

echo Installing dependencies if needed...
call npm install

echo.
echo Starting backend server on https://ss-dash-be.onrender.com...
echo.
echo The server will be available at:
echo - Health check: https://ss-dash-be.onrender.com/health
echo - API base: https://ss-dash-be.onrender.com/api
echo - Login endpoint: https://ss-dash-be.onrender.com/api/auth/login
echo.

call npm start

pause
