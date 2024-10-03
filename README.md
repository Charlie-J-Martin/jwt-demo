# JWT Demo API

## Overview

This repository contains an Express API that demonstrates how to use JWT (JSON Web Tokens) for authentication. The API allows users to generate a token, add pension records, and retrieve pension details.

## Installation

1. Clone the repository:

```
git clone https://github.com/Charlie-J-Martin/jwt-demo.git
```

2. Navigate to the project directory:

```
cd jwt-demo
```

3. Install dependencies:

```
npm install
```

### Running the Server

To start the server, run:

```
npm start
```

This will start the server on port 3000.

## API Endpoints

1. `/ping` (GET)

- Description: Test endpoint to verify if the server is running.
- Response: `"pong"`

2. `/generate-token` (POST)

- Description: Generates a JWT token for the user.
- Request Body:
  - `name` (string): The user's name.
  - `id` (string): The user's ID.
  - `email` (string): The user's email.
  - `role` (string): The user's role.
  - `team` (string): The user's team.
  - `accessLevel` (array): Array of strings indicating access levels, e.g., `["read", "write"]`.
- Response: JWT token (valid for 1 hour).

3. `/add-pension` (POST)

- Description: Adds a new pension record.
- Authentication Required: Yes, access level `write`.
- Request Header: `Authorization: Bearer <JWT Token>`
- Request Body:
  - `name` (string): Pension owner's name.
  - `value` (number): Pension value.
- Response: "Pension Added"

4. `/pensions` (GET)

- Description: Retrieves the list of pension records.
- Authentication Required: Yes, access level `read`.
- Request Header: `Authorization: Bearer <JWT Token>`
- Response: Array of pension records.

### Authentication

This API uses JWT for securing endpoints. Tokens are generated using /generate-token and should be included in the Authorization header for protected endpoints.

- Header Format:

```
Authorization: Bearer <token>
```

## Accessing the API Using Postman

### Generate a Token

1. URL: `http://localhost:3000/generate-token`
2. Method: `POST`
3. Headers:

- `Content-Type`: `application/json`

4. Body:

- Select `raw` and `JSON` format in the body section.
- Example:

```
{
  "name": "John Doe",
  "id": "12345",
  "email": "johndoe@example.com",
  "role": "admin",
  "team": "engineering",
  "accessLevel": ["read", "write"]
}
```

5. Send Request:

- Click `Send`.
- Copy the JWT token from the response body.

Step 2: Access Protected Endpoints

### Add a Pension `(/add-pension`)

1. URL: `http://localhost:3000/add-pension`
2. Method: POST
3. Headers:

- Content-Type: application/json
- Authorization: Bearer <JWT Token> (Replace <JWT Token> with the token generated in Step 1)

4. Body:

- Select raw and JSON format in the body section.
- Example:

```
{
  "name": "James Bond",
  "value": 700.07
}
```

5. Send Request:

- Click `Send`.
- You should receive the response: `"Pension Added"`.

### Get Pensions (`/pensions`)

1. URL: `http://localhost:3000/pensions`
2. Method: `GET`
3. Headers:

- `Authorization`: `Bearer <JWT Token>` (Replace `<JWT Token>` with the token generated in Step 1)

4. Send Request:

- Click `Send`.
- You should receive an array of pension records.
