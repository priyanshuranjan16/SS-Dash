@echo off
echo Starting D Dash Backend Server...
echo.
echo Make sure MongoDB is running first!
echo.

cd backend

echo Installing dependencies if needed...
call npm install

echo.
echo Starting backend server on localhost:4000...
echo.
echo The server will be available at:
echo - Health check: http://localhost:4000/health
echo - API base: http://localhost:4000/api
echo - Login endpoint: http://localhost:4000/api/auth/login
echo.

call npm start

pause
