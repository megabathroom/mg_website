## Development

1. Install NodeJS 16.20.0.
1. Install yarn.
   ```
   npm i -g yarn
   ```
1. Install node modules.
   ```
   yarn
   ```
1. Start application.
   ```
   yarn start
   ```

## Production

- Docker on Windows:
  1. Install Docker Desktop 4.20.1.
  1. Start container.
     ```
     docker-compose up
     ```
- Docker on Linux:
  1. Install docker.io and docker-compose.
     ```
     sudo apt update
     sudo apt install docker.io
     sudo apt install docker-compose
     ```
  1. Start container.
     ```
     docker-compose up
     ```
- NodeJS on Windows.
  1. Install NodeJS 16.20.0.
  1. Install yarn.
     ```
     npm i -g yarn
     ```
  1. Install node modules.
     ```
     yarn
     ```
  1. Build project.
     ```
     yarn build
     ```
  1. Start server.
     ```
     npx serve -d build
     ```
