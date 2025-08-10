#!/bin/bash

echo "Starting D Dash Backend Server..."
echo ""
echo "This script will:"
echo "1. Navigate to the backend directory"
echo "2. Install dependencies (if needed)"
echo "3. Start the backend server"
echo ""

# Navigate to backend directory
cd backend

echo "Checking if node_modules exists..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "Error: Failed to install dependencies"
        exit 1
    fi
fi

echo ""
echo "Starting backend server..."
echo "Backend will be available at: http://localhost:3001"
echo "Health check: http://localhost:3001/health"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
