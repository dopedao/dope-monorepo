# !!! DEV NOTE !!!
#
# Only the "game" server is currently being built via Dockerfile
# to host on GCP "Flexible Environment". 
#
# If we want to host other services on "flexible" env we should
# probably restructure the code in such a fashion that each thing
# lives in its own top-level "packages" directory…
# EX: packages/api, packages/game-server, packages/api-indexer

# FOR GAE Flexible Environment Custom Runtime 
FROM golang:1.18

ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

RUN apt-get update && \
    apt-get install -y wget build-essential pkg-config --no-install-recommends

WORKDIR /build

# Copy the code into the container
COPY . .

# Copy and download dependencies
RUN go mod download

# Build the GAME application
RUN go build ./cmd/gameServer/main.go

# Default port GCP wants
EXPOSE 8080

# Run this when starting container
CMD ["/build/main"]