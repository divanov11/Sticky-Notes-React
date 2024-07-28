# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t sticky-notes-app:v1.0.0 . 

# Create docker network
create-net:
  docker network create sticky-notes
  
# Run Docker Container
run-container:
  docker run -d -p 4000:3000 --network sticky-notes --restart always --name sticky-notes sticky-notes-app:v1.0.0  

# Dispose container  
dispose-container:
  docker stop sticky-notes
  docker rm sticky-notes

# Docker compose up (detached)
compose:
  docker compose up -d

# Docker compose down
compose-down:
  docker compose down

# Tear down container plus volumes
tear-down:
  docker compose down -v
