# Trollo APIs

The data the API receives and returns.

## Authentication Cookie.
Due to issues with localhost cookies (i think) it may be best to save the cookie returned from login to localstorage, this will let it persist between sessions. On the initial load of the program, make a request to /user providing that cookie, or not, and it will return either the account data or an error message. NOTE: ```javascript { "error": "You are not logged in" } ``` will be returned from all the API's if you are not logged in.

```javascript
headers: {
  auth: 'trollo' || cookie  // During development, you can use 'trollo' to bypass the authentication and act as user with id: 1
}
```



    ## User API Endpoints

### POST  /user/signup
```javascript
body: {
  email: 'example@example.com',
  password: 'example',
  avatar: '' // [OPTIONAL]
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

  ## Project API POST points

### POST   /project
Create a project with the name of 'Test'

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



### POST   /project/:projectId/board
Create a board with the name 'My Board' for a specific project using its id.
This creates three default starting columns: Ideas, ToDo & Done.

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

### POST   /project/:projectId/:boardId/column
Create a column with the name 'My Column' for a specific board within a project using their ids.

```javascript
// SEND AUTH HEADER
body: {
  name: 'My Column'
}

// Returns
{
    "message": "success",
    "data": {
        "name": "My Column"
    },
    "id": 1
}
```

### POST   /project/:projectId/:boardId/:columnId/task
Create a task with the name 'My Task' within a specific column for a board and project using their ids.

```javascript
// SEND AUTH HEADER
body: {
  name: 'My Task',
  description: 'Additional data about the task.', // [OPTIONAL]
  assigned: 'The id of the user assigned to the task, eg: 1' // [OPTIONAL]
}

// Returns
{
    "message": "success",
    "data": {
        "name": "My Task",
        "description": "Additional data about the task.",
        "assigned": 1
    },
    "id": 1
}
```

  ## Project API GET points

### GET   /projects
Fetch all the projects that a user is a member or creator of.

```javascript
// SEND AUTH HEADER

// Returns
{
    "message": "success",
    "data": [
        {
            "id": 1,
            "name": "Test",
            "adminId": 1
        }
    ]
}
```

### GET   /project/:projectId
Fetch all the boards that are apart of a project that a user is a member or creator of.

```javascript
// SEND AUTH HEADER

// Returns
{
    "message": "success",
    "data": {
        "members": [
            {
                "id": 1,
                "email": "example@example.com",
                "username": "example",
                "avatar": null
            }
        ],
        "boards": [
            {
                "id": 1,
                "name": "My Board",
                "background": "#d5ebda", // <- A randomly assigned background colour from a list of 7 options. (dont have to use)
                "projectId": 1
            }
        ]
    }
}
```

### GET   /project/:projectId/board/:boardId
Fetch the board data, columns and tasks of a specified project and board, that the user is a member of.

```javascript
// SEND AUTH HEADER

// Returns
{
    "message": "success",
    "data": {
        "board": {
            "id": 1,
            "name": "My Board",
            "background": "#d5ebda",
            "projectId": 1
        },
        "columns": {
            "1": {
                "id": 1,
                "name": "Ideas",
                "boardId": 1,
                "tasks": [
                    {
                        "id": 1,
                        "name": "My Task",
                        "description": "Additional data about the task.",
                        "assigned": 1,
                        "columnId": 1,
                        "creatorId": 1
                    }
                ]
            },
            "2": {
                "id": 2,
                "name": "Todo",
                "boardId": 1,
                "tasks": []
            },
            "3": {
                "id": 3,
                "name": "Done",
                "boardId": 1,
                "tasks": []
            }
        }
    }
}
```