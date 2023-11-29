# Chat Group API

## Description

API related with [Chat Group](https://github.com/iancarlosortega/chat-group).

## Tech Stack

- NestJS
- TypeOrm
- Docker
- Postgresql
- Socket.io
- Cloudinary

## Development environment setup

- Install [NestJS](https://nestjs.com/) in your computer with `npm install -g @nestjs/cli`
- Install [DockerHub](https://hub.docker.com/)
- Clone the repository `git clone https://github.com/iancarlosortega/chat-group-api.git`
- Install dependencies by running `npm install`
- Copy `.env.template` and rename to `.env.local` file and fill the environment variables
- Run `docker compose up -d` to raise the database
- Run `npm run start:dev` to start the development server

## Documentation

Documentation of all endpoints can be found [here](https://chat-group-realtime.onrender.com/api)
