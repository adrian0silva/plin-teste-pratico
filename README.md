# Project Name

## Project Structure

- **`src`**: Contains the source code, organized by modules.
  - **`clients`**: Handles client-related functionalities.
  - **`documents`**: Manages document processing and storage.
  - **`types`**: Defines custom data types and interfaces.
  - **`app.module.ts`**: The root module of the application.
  - **`main.ts`**: The entry point of the application.
- **`test`**: Contains the test files.
- **`scripts`**: Includes additional scripts for automation or database management.
- **`node_modules`**: Stores all the project dependencies.
- **`dist`**: Contains the compiled JavaScript code.
- **`coverage`**: Stores the code coverage reports.
- **`Dockerfile`**: Defines the Docker image for the application.
- **`docker-compose.yml`**: Configures the services, networks, and volumes for Docker.
- **`package.json`**: Lists the project dependencies and scripts.
- **`README.md`**: This file, providing information about the project.
- **`tsconfig.json`**: The TypeScript configuration file.

## Getting Started

To get started with this project, you'll need to have Docker and Docker Compose installed on your machine.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://your-repository-url.com
   ```
2. Navigate to the project directory:
   ```sh
   cd project-directory
   ```
3. Build and run the containers:
   ```sh
   docker-compose up --build
   ```

## Running the Application

Once the containers are up and running, the API will be available at `http://localhost:3000`.

To stop the application, run:
```sh
docker-compose down
```

## Postman Collection

This project includes a Postman collection to help you test the API. You can import the collection by following these steps:

1. Open Postman.
2. Click on the "Import" button.
3. Select the `Teste pratico API Plin.postman_collection.json` file from the root of the project.
4. The collection will be imported and you can start making requests to the API.
