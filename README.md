# App README

Welcome to our application! This README will guide you through the steps to set up and run both the frontend and backend applications.

## Postman Collection

A Postman collection containing the backend APIs is provided in the root directory. You can import this collection into Postman to test the APIs.

There is a variable that hold the hostname called -> ```{{apiV1}}``` and we have to provide the bearer token into the Authorization header.

## Frontend App

### Setup

1. Navigate to the `front-end` directory:

    ```bash
    cd front-end
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

### Running the App

3. Start the FE app:

    ```bash
    npm start
    ```

The app will now be running on `http://localhost:3000`.

## Backend (BE) App

### Setup

1. Navigate to the `back-end` directory:

    ```bash
    cd back-end
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Set up the environment variables:
   
   - Create a new file named `.env` in the `back-end` directory.
   - Copy the variables from `.env.example` into the new `.env` file.
   - Replace the placeholder values with your actual database and other configuration values.

### Database Migration

4. Run Prisma migrations:

    ```bash
    npx prisma migrate deploy
    ```

### Running the App

5. Start the BE app in development mode:

    ```bash
    npm run dev
    ```

The backend server will now be running on `http://localhost:3001` for example.

Thank you for using our application! If you encounter any issues or have any questions, please don't hesitate to reach out.
