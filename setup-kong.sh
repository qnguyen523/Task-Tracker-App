#!/bin/bash

# Wait for Kong to be ready
echo "Waiting for Kong to be ready..."
until curl -s http://localhost:8001 > /dev/null; do
  echo "Waiting for Kong Admin API..."
  sleep 5 # wait for 5 seconds
done

echo "Kong Admin API is ready!"

# Create a service for the task tracker app
echo "Creating service for task tracker app..."
curl -i -X POST http://localhost:8001/services \
  --data "name=task-tracker" \
  --data "url=http://task-tracker-app:8080"

# Create a route for static assets
echo "Creating route for static assets..."
curl -i -X POST http://localhost:8001/services/task-tracker/routes \
  --data "paths[]=/static" \
  --data "strip_path=false"

# Create a route for other assets (manifest.json, favicon.ico, etc.)
echo "Creating route for other assets..."
curl -i -X POST http://localhost:8001/services/task-tracker/routes \
  --data "paths[]=/manifest.json" \
  --data "paths[]=/favicon.ico" \
  --data "paths[]=/logo192.png" \
  --data "paths[]=/logo512.png" \
  --data "strip_path=false"

# Create a route for the root path
echo "Creating route for the root path..."
curl -i -X POST http://localhost:8001/services/task-tracker/routes \
  --data "paths[]=/" \
  --data "strip_path=false"

echo "Kong setup completed!"
echo "Your task tracker app is now accessible through Kong at: http://localhost:8000/" 