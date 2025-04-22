#!/bin/bash

echo "Resetting Kong database..."

# Stop Kong services
echo "Stopping Kong services..."
docker-compose stop kong kong-migration

# Connect to the database and reset it
echo "Resetting database schema..."
docker exec -it kong-db psql -U kong -d kong -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO kong; GRANT ALL ON SCHEMA public TO public;"

# Start Kong migration service
echo "Running Kong migrations..."
docker-compose up -d kong-migration

# Wait for migrations to complete
echo "Waiting for migrations to complete..."
sleep 10

# Start Kong
echo "Starting Kong..."
docker-compose up -d kong

# Wait for Kong to be ready
echo "Waiting for Kong to be ready..."
until curl -s http://localhost:8001 > /dev/null; do
  echo "Waiting for Kong Admin API..."
  sleep 5
done

echo "Kong Admin API is ready!"

# Run the setup script
echo "Running Kong setup script..."
./setup-kong.sh

echo "Kong database has been reset and reinitialized!" 