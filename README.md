# Sprinter Server

The server that manages the users and questions for the sprinter mobile app.

## API Reference

### Authentication

#### Login

Get a JWT access token to use the platform

##### Request

```http
POST /auth/login
```

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| email    | string |             |
| password | string |             |

##### 201 Response

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| accessToken | string |             |

##### 400/500 Reponse

| Field | Type   | Description |
| ----- | ------ | ----------- |
| error | string |             |

#### Register

Create a new account

##### Request

```http
POST /auth/register
```

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| email    | string |             |
| username | string |             |
| password | string |             |

##### 200 Response

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| accessToken | string |             |

##### 401 Response

Incorrect email/password

| Field | Type   | Description |
| ----- | ------ | ----------- |
| error | string |             |

### Questions

#### Get recommended questions

Fetches 10 random questions for the user that has not been completed

##### Request

```http
GET /questions
Authorization: 'Bearer <token>
```

##### Example Response

```json
[
    {
        "_id": "<question id>",
        "question": "<image data as 64 based string>",
        "markScheme": "<image data as 64 based string>",
        "title": "<title>",
        "description": "<description>",
        "totalMarks": 5,
        "author": "<user id>"
    }
    // 9 More question
]
```

#### Get a question

Get information on a single question

##### Request

```http
GET /questions/:id
```

##### Example Response

```json
{
    "_id": "<question id>",
    "question": "<image data as 64 based string>",
    "markScheme": "<image data as 64 based string>",
    "course": "<course id>",
    "title": "<title>",
    "description": "<description>",
    "totalMarks": 3,
    "author": "<user id>",
    "createdAt": "ISO Date",
    "updatedAt": "ISO Date",
    "__v": 0
}
```

#### Post a question

Upload a question onto the platform

##### Request

```http
POST /questions
Authorization: 'Bearer <token>'
```

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| question    | string |             |
| markScheme  | string |             |
| title       | string |             |
| description | string |             |
| course      | string |             |
| totalMarks  | number |             |
| author      | string |             |

##### 201 Response

A question was successfully uploaded

#### Search a question

##### Request

```http
GET /questions/search
```

| Query Parameter | Type      | Description                                                                                   |
| :-------------- | :-------- | :-------------------------------------------------------------------------------------------- |
| `difficulty`    | `string`  | Either `easy`, `ok`, `medium` or `hard`                                                       |
| `minMarks`      | `integer` |                                                                                               |
| `maxMarks`      | `integer` |                                                                                               |
| `sortBy`        | `string`  | Sorts the posts in descending order from either `views`, `favorites`, `difficulty` or `marks` |

##### Response Example

```json
[
    {
        "_id": "<question id>",
        "question": "<image data as 64 based string>",
        "markScheme": "<image data as 64 based string>",
        "title": "<title>",
        "description": "<description>",
        "totalMarks": 5,
        "author": "<user id>"
    }
    // 9 More question
]
```

### Question Favorites

#### Get number of favorites on a question

##### Request

```http
GET /question/:id/favorites
```

##### 200 Response Example

```json
{
    "count": 1
}
```

#### Get is question favorited

Check if you have favorited a question

##### Request

```http
GET /question/:id/favorited
Authorization: 'Bearer <token>'
```

##### Example Response

```json
{
    "isFavorited": false
}
```

#### Favorite a question

##### Request

```http
POST /questions/:id/favorites
Authorization: 'Bearer <token>
```

##### 201 Response

You have successfully favorited a question

##### 400 Response Example

```json
{
    "error": "Question already favorited"
}
```

#### Unfavorite a question

##### Request

```http
DELETE /questions/:id/favorites
Authorization: 'Bearer <token>'
```

##### 204 Response

Successfully removed a favorite from a question

### Question Comments

#### Get comments on a question

##### Request

```http
GET /questions/:id/comments
```

##### 200 Response Example

```json
[
    {
        "_id": "67c5fc2b7a6dc8de1831ad60",
        "user": {
            "_id": "679379163a5b4910dce29cf1",
            "username": "lanzo",
            "profilePicture": "",
            "description": ""
        },
        "question": "67a8c5e22cdf186910465b03",
        "comment": "why are they using arctan?",
        "createdAt": "2025-03-03T18:59:55.064Z",
        "updatedAt": "2025-03-03T18:59:55.064Z",
        "__v": 0
    }
]
```

#### Create a comment on a question

##### Request

```http
POST /questions/:id/comments
Authorization: 'Bearer <token>'
```

### Question Ratings

#### Rate a question

##### Request

```http
POST /questions/:id/ratings
Authorization: 'Bearer <token>'
```

### Users

#### Get user information

##### Request

```http
GET /users/:id
```

##### Example Response

```json
{
    "username": "johndoe",
    "description": "",
    "profilePicture": "<image data as a 64 based string>"
}
```

#### Update user information

##### Request

```http
PUT /users/:id
```

##### Example Request

```json
{
    "username": "johndoe",
    "description": "",
    "profilePicture": "<image data as a 64 based string>"
}
```

#### Get questions from a user

##### Request

```http
GET /users/:id/questions
```

### Courses

#### Get courses

Get all the courses available on the platform

##### Request

```http
GET /courses
```

##### 200 Response

A list of courses (objects) in the format:

| Field         | Type   | Description |
| ------------- | ------ | ----------- |
| \_id          | string |             |
| name          | string |             |
| qualification | string |             |
| examBoard     | string |             |

#### Create course

##### Request

```http
POST /courses
Authorization: 'Bearer <token>'
```

##### 201 Response

A course was successfully created

### Achievements

#### Get achievements

##### Request

```http
GET /achievements
Authorization: 'Bearer <token>
```

#### Post an achievement

##### Request

```http
POST /achievements
Authorization: 'Bearer <token>'
```

### Account Courses

#### Get account courses

Get all the courses the user is taking

##### Request

```http
GET /account/courses
Authorization: 'Bearer <token>'
```

##### 200 Response Example

```json
[
    {
        "_id": "6780d9e185ee097fc5487941",
        "name": "Maths",
        "qualification": "A Level",
        "examBoard": "Edexcel"
    },
    {
        "_id": "6780da8936ae4b546d9a5f22",
        "name": "Further Maths",
        "qualification": "A Level",
        "examBoard": "Edexcel"
    },
    {
        "_id": "6780daac36ae4b546d9a5f28",
        "name": "Physics",
        "qualification": "A Level",
        "examBoard": "OCR"
    }
]
```

#### Update account courses

Change what courses the user is taking

##### Request

```http
PUT /account/courses
Authorization: 'Bearer <token>'
```

Send a list of course ids the user wants to take

```json
[
    "6780d9e185ee097fc5487941",
    "6780da8936ae4b546d9a5f22",
    "6780daac36ae4b546d9a5f28"
]
```

##### 200 Response

Account courses has successfully been updated

### Account Achievements

#### Get all account achievements

##### Request

```http
GET /account/achievements
Authorization: 'Bearer <token>
```

##### 200 Response Example

```json
[
    {
        "name": "Study Slayer",
        "description": "Completed 100 questions",
        "createdAt": "2025-03-03T16:53:51.449Z"
    }
]
```

#### Post a new achievement for an account

Award an achievement to your account

##### Example Request

```http
POST /account/achievements
Authorization: 'Bearer <token>'
```

```json
{
    "user": "679379163a5b4910dce29cf1",
    "achievement": "67977bb23691ccd1841ca878"
}
```

##### 201 Response

Successfully awarded an achievement to your account

### Account Analytics

#### Get current daily streak

```http
GET /account/daily-streak
```

-   JWT Access Token is required in Authorization header

##### Example Response

```json
{
    "streak": 3
}
```

#### Get course statistics for an account

```http
GET /account/statistics
```

-   JWT Access Token is required in Authorization header

##### Example Response

```json
{
    "A Level Edexcel Maths": 0.7,
    "A Level Edexcel Further Maths": 0.3,
    "A Level OCR Physics": 0.5
}
```

### Account Settings

#### Change email

##### Request

```http
PUT /account/email
Authorization: 'Bearer <token>'
```

##### 201 Response

Email has been successfully changed

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| accessToken | string |             |

#### Change password

##### Request

```http
PUT /account/password
Authorization: 'Bearer <token>'
```

##### 200 Response

Password was successfully changed

#### Delete account

##### Request

```http
DELETE /account
Authorization: 'Bearer <token>'
```

##### 204 Request

Account was successfully deleted
