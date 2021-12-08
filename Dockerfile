# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.202.5/containers/python-3/.devcontainer/base.Dockerfile
FROM mcr.microsoft.com/vscode/devcontainers/python:0-3.7-bullseye

ARG INSTALL="apt-get -y install --no-install-recommends"

RUN apt-get update && ${INSTALL} \
   build-essential \
   git \
   ca-certificates \
   cmake \
   curl \
   gnupg \
   libarchive-tools \
   pkg-config \
   software-properties-common \
   libpq-dev \
   ssh \
   sudo \
   && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/udhos/update-golang && RELEASE=1.17.2 ./update-golang/update-golang.sh

RUN curl -s https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - \
   && echo "deb http://apt.postgresql.org/pub/repos/apt focal-pgdg main" > /etc/apt/sources.list.d/pgdg.list \
   && apt-get update && ${INSTALL} postgresql-11 \
   && rm -rf /var/lib/apt/lists/*