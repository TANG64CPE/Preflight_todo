#!/bin/bash
set -e

echo "=========================================="
echo "Updating Preflight Todo Application..."
echo "=========================================="

# 1. Pull latest code from GitHub
echo "Pulling latest code from GitHub..."
git pull origin main

# 2. Build and restart Docker containers
echo "Rebuilding & restarting Docker containers..."
docker compose up -d --build

# 3. Clean up dangling images
echo "Cleaning up dangling Docker images..."
docker image prune -f

echo "=========================================="
echo "Update Complete! Current status:"
echo "=========================================="
docker compose ps
