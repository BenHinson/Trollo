# Trollo APIs

The data the API receives and returns.

## Authentication Cookie.
Due to issues with localhost cookies (i think) it may be best to save the cookie returned from login to localstorage, this will let it persist between sessions. On the initial load of the program, make a request to /user providing that cookie, or not, and it will return either the account data or an error message. NOTE: ```javascript { "error": "You are not logged in" } ``` will be returned from all the API's if you are not logged in.

```javascript
headers: {
  auth: 'trollo' || cookie  // During development, you can use 'trollo' to bypass the authentication and act as user with id: 1
}
```



### API Endpoints
## User

### POST  /user/signup
```javascript
body: {
  email: 'example@example.com',
  password: 'example',
  avatar: [OPTIONAL STRING]
}

// RETURNS EITHER
{
  'message': 'success'
}

{
  'error': 'An account already exists for this email'
}
```

### POST  /user/login
```javascript
body: {
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


### GET   /user
```javascript
// SEND AUTH HEADER

// RETURNS EITHER
{
    "message": "success",
    "data": {
        "id": 1,
        "username": "example",
        "email": "example@example.com",
        "avatar": null
    }
}
{
    "error": "You are not logged in"
}
```


### POST   /project
```javascript
// SEND AUTH HEADER
body: {
  name: 'Test'
}

// Returns
{
    "message": "success",
    "data": {
        "name": "Test"
    },
    "id": 1
}
```

