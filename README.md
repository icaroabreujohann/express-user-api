
# User Auth API

RESTful API developed with Node.js + Express for user registration, login, and authentication.

Although designed for a simple user management context, the API is built following best practices and scalable patterns, including:

- Global data validation to ensure consistency and security in requests.

- Password hashing with bcrypt, providing protection for sensitive data.

- JWT-based authentication, with support for expired tokens and secure renewal.

- Error codes and standardized messages dictionary, making integration and error handling easier for clients or front-ends.

- Modular structure that allows easy expansion and maintenance, prepared for large-scale applications.

##  Installation and Running

```bash
# Clone the repository
git clone https://github.com/icaroabreujohanno/express-user-api.git

# Enter project directory
cd express-user-api

# Install dependencies
npm install express, dotenv, cors, jsonwebtoken, bcrypt, postgres

# Configure environment variables
.env

# Run the API
node --watch app.js
```

It will run the api in
```http://localhost:3001```

## Endpoints

### Register User

**POST: ```/auth/register```**

```
{
    "username": "johndoe",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe01@gmail.com",
    "password": "#john!doe0"
}
```

Response:
```
{
    "success": true,
    "message": "User created successfully",
    "data": {
        "id": "db91c404-04e0-4a34-bcc2-022e0b46ecf5",
        "username": "johndoe",
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe01@gmail.com",
        "created_at": "2025-08-27T17:46:05.235Z",
        "updated_at": "2025-08-27T17:46:05.235Z"
    },
    "code": 2000,
    "key": "SUCCESS_USER_CREATED"
}
```

### Login User
**POST: ```/auth/login```**
```
{
    "email": "johndoe01@gmail.com",
    "password": "#john!doe0"
}
```
Response:
```
{
    "success": true,
    "message": "User authorized successfully",
    "data": {
        "token": "YOUR_TOKEN",
        "user": {
            "id": "user_uuid",
            "username": "johndoe",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe01@gmail.com",
            "created_at": "2025-08-27T17:46:05.235Z",
            "updated_at": "2025-08-27T17:46:05.235Z"
        }
    },
    "code": 2001,
    "key": "SUCCESS_USER_USER_AUTHORIZED"
}
```

### Get Authenticated User [ By Token ]
**POST: ```/auth/me```**
```
{
    headers: Authorization: Bearer YOUR_JWT_TOKEN
}
```
Response:
```
{
    "success": true,
    "message": "User authorized successfully",
    "data": {
        "user": {
            "user_id": "user_uuid",
            "first_name": "John",
            "last_name": "Doe",
            "email": "johndoe01@gmail.com",
            "created_at": "2025-08-27T17:46:05.235Z",
            "updated_at": "2025-08-27T17:46:05.235Z",
            "iat": 1756316876,
            "exp": 1756360076
        }
    },
    "code": 2001,
    "key": "SUCCESS_USER_USER_AUTHORIZED"
}
```

# Messages Dictionary

### Success Codes

| Code  | Key                       | Message                        |
|-------|---------------------------|--------------------------------|
| 2000  | SUCCESS_USER_CREATED      | User created successfully      |
| 2001  | SUCCESS_USER_AUTHORIZED   | User authorized successfully   |
| 2002  | SUCCESS_USER_UPDATED      | User updated successfully      |
| 2003  | SUCCESS_USER_DELETED      | User deleted successfully      |

### Error Codes

| Code  | Key                     | Message                                      |
|-------|-------------------------|----------------------------------------------|
| 1000  | ERR_INTERNAL_ERROR      | Internal server error                         |
| 1001  | ERR_MISSING_FIELDS      | Missing required fields                       |
| 1002  | ERR_USER_EXISTS         | Username or email already exists             |
| 1003  | ERR_INVALID_CREDENTIALS | Invalid username or password                 |
| 1004  | ERR_USER_NOT_FOUND      | User not found, check the email or username |
| 1004  | ERR_TOKEN_NOT_PROVIDED  | Token not provided, please check             |
| 1005  | ERR_TOKEN_NOT_VALID     | Token is not valid or expired                |

