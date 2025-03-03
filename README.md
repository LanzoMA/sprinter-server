# Sprinter Server

The server that manages the users and questions for the sprinter mobile app.

## API Reference

### Authentication

#### Login

```http
POST /auth/login
```

##### Example Request

```json
{
    "email": "johndoe@example.com",
    "password": "password"
}
```

##### Example Response

```json
{
    "accessToken": "<token>"
}
```

#### Register

```http
POST /auth/register
```

##### Example Request

```json
{
    "email": "johndoe@example.com",
    "username": "johndoe",
    "password": "password"
}
```

##### Example Response

```json
{
    "accessToken": "<token>"
}
```

### Questions

#### Get recommended questions

```http
GET /questions
```

-   Fetches 10 recommended questions for the user that has not been completed
-   JWT Access Token is required in Authorization header

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

```http
POST /questions
```

-   JWT Access Token is required in Authorization header

#### Rate a question

```http
POST /questions/:id/ratings
```

-   JWT Access Token is required in Authorization header

#### Search a question

```http
GET /questions/search
```

| Query Parameter | Type      | Description                                                                                   |
| :-------------- | :-------- | :-------------------------------------------------------------------------------------------- |
| `difficulty`    | `string`  | Either `easy`, `ok`, `medium` or `hard`                                                       |
| `minMarks`      | `integer` |                                                                                               |
| `maxMarks`      | `integer` |                                                                                               |
| `sortBy`        | `string`  | Sorts the posts in descending order from either `views`, `favorites`, `difficulty` or `marks` |

#### Get number of favorites on a question

```http
GET /question/:id/favorites
```

#### Get is question favorited

```http
GET /question/:id/favorited
```

-   JWT Access Token is required in Authorization header

##### Example Response

```json
{
    "isFavorited": false
}
```

#### Favorite a question

```http
POST /questions/:id/favorites
```

-   JWT Access Token is required in Authorization header

#### Unfavorite a question

```http
DELETE /questions/:id/favorites
```

-   JWT Access Token is required in Authorization header

#### Get comments on a question

```http
GET /questions/:id/comments
```

#### Create a comment on a question

```http
POST /questions/:id/comments
```

-   JWT Access Token is required in Authorization header

### Users

#### Get user information

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

```http
GET /users/:id/questions
```

Where :id is the id of the user.

### Courses

#### Get courses

```http
GET /courses
```

-   JWT Access Token is required in Authorization header

#### Create course

```http
POST /courses
```

-   JWT Access Token is required in Authorization header

### Achievements

#### Get achievements

```http
GET /achievements
```

-   JWT Access Token is required in Authorization header

#### Post an achievement

```http
POST /achievements
```

-   JWT Access Token is required in Authorization header

### Account

#### Get account courses

```http
GET /account/courses
```

-   JWT Access Token is required in Authorization header

#### Change account courses

```http
PUT /account/courses
```

-   JWT Access Token is required in Authorization header

#### Get all account achievements

```http
GET /account/achievements
```

-   JWT Access Token is required in Authorization header

#### Post a new achievement for an account

```http
POST /account/achievements
```

-   JWT Access Token is required in Authorization header

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

#### Get account profile picture

```http
GET /account/profile-picture
```

-   JWT Access Token is required in Authorization header

#### Update account profile picture

```http
POST /account/profile-picture
```

-   JWT Access Token is required in Authorization header

#### Change email

```http
PUT /account/email
```

-   JWT Access Token is required in Authorization header

#### Change password

```http
PUT /account/password
```

-   JWT Access Token is required in Authorization header

#### Delete account

```http
DELETE /account
```

-   JWT Access Token is required in Authorization header
