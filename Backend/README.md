# Trollo APIs

The data the API receives and returns.


## User

### POST  /user/signup
```javascript
{
  email: 'example@example.com',
  password: 'example',
  avatar: [OPTIONAL]
}

// RETURNS EITHER
{
  'message': 'success',
}

{
  'error': 'An account already exists for this email'
}
```

### POST  /user/login
```javascript
{
  email: 'example@example.com',
  password: 'example'
}

// RETURNS EITHER
{
    "message": "Successful login",
    "account": {
        "id": 1,
        "email": "example@example.com",
        "username": "example",
        "cookie": "dCuhhk9yOD2LeD5aBi9Dz"  // <- This is temporary, but acts as a unique, unguessable id for now.
    }
}

{
  'error': 'Incorrect email or password'
}
```