@echo off
title Endesnaht
echo [Endesnaht] Auto-run is starting ..

:main
cd client

REM Start cloudflared tunnel in a new window
start "Cloudflared Tunnel" cloudflared tunnel run endesnaht

REM Start npm dev server in a new window
start "Vite Dev Server" npm run dev