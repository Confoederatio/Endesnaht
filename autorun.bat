@echo off
title Snow Zed
echo [Snow Zed] Auto-run is starting ..
:main
node --max-old-space-size=12192 main.js
timeout /t 30
echo [Snow Zed] Crashed! Restarting ..
goto main
