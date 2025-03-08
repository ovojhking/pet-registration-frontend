#!/bin/sh

# check if node_modules exists to avoid reinstallation every time the container starts
if [ ! -d "node_modules" ]; then
  npm install
fi

exec npm run dev -- --host --port 3000