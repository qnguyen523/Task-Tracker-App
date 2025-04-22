# Kong API Gateway Integration

This document explains how to use Kong API Gateway with the Task Tracker application.

## Overview

Kong is an API Gateway that sits in front of your application and provides features like:

- Rate limiting
- Authentication
- Request/response transformation
- Logging and monitoring
- Load balancing
- And much more

## Setup Instructions

### 1. Start the Docker Compose Environment

```bash
docker-compose up -d
```

This will start:
- The Task Tracker application
- PostgreSQL database for Kong
- Kong API Gateway
- Kong database migrations

### 2. Configure Kong

After all services are up and running, execute the setup script:

```bash
./setup-kong.sh
```

This script will:
- Wait for Kong to be ready
- Create a service for the Task Tracker application
- Create a route to access the application through Kong

### 3. Access Your Application

Once everything is set up, you can access your application through Kong at:

```
http://localhost:8000
```

## Kong Admin API

You can manage Kong through its Admin API at:

```
http://localhost:8001
```

### Example: List all services

```bash
curl -i http://localhost:8001/services
```

### Example: List all routes

```bash
curl -i http://localhost:8001/routes
```

## Adding Plugins

Kong has a rich ecosystem of plugins. Here are some examples of how to add them:

### Rate Limiting

```bash
curl -i -X POST http://localhost:8001/services/task-tracker/plugins \
  --data "name=rate-limiting" \
  --data "config.minute=5" \
  --data "config.policy=local"
```

### CORS

```bash
curl -i -X POST http://localhost:8001/services/task-tracker/plugins \
  --data "name=cors" \
  --data "config.origins=*" \
  --data "config.methods=GET,POST,PUT,DELETE,OPTIONS" \
  --data "config.headers=Accept,Accept-Version,Content-Length,Content-MD5,Content-Type,Date,apikey" \
  --data "config.exposed_headers=Content-Length,Content-Range" \
  --data "config.credentials=true" \
  --data "config.max_age=3600"
```

## Troubleshooting

If you encounter issues:

1. Check the logs:
   ```bash
   docker-compose logs kong
   ```

2. Restart the Kong service:
   ```bash
   docker-compose restart kong
   ```

3. Re-run the setup script:
   ```bash
   ./setup-kong.sh
   ```

## Additional Resources

- [Kong Documentation](https://docs.konghq.com/)
- [Kong Admin API Reference](https://docs.konghq.com/gateway/latest/admin-api/)
- [Kong Plugins](https://docs.konghq.com/hub/) 