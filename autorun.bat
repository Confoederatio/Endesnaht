@echo off
title Endesnaht
echo [Endesnaht] Auto-run is starting ..

REM Start cloudflared tunnel in a new window
start "Cloudflared Tunnel" cloudflared tunnel run endesnaht

REM Start the Node.js server in a new window
start "Node Server" cmd /k "cd server && node server.js"

REM Start npm dev server in a new window
start "Vite Dev Server" cmd /k "cd client && npm run dev"