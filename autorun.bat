@echo off
title "Endesnaht"
echo [Endesnaht] Auto-run is starting ..
:main
cd client
npm run dev
timeout /t 30
echo [Endesnaht] Crashed! Restarting ..
goto main
