# Sprinter Server

The server that manages the users and questions for the sprinter mobile app.

## API Reference

### Authentication

#### Login

```http
POST /auth/login
```

#### Register

```http
POST /auth/register
```

### Questions

#### Get recommended questions

```http
GET /questions
```

#### Get a question

```http
GET /questions/:id
```

#### Post a question

```http
POST /questions
```

#### Rate a question

```http
POST /questions/:id/ratings
```

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

#### Favorite a question

```http
POST /questions/:id/favorites
```

#### Unfavorite a question

```http
DELETE /questions/:id/favorites
```

#### Get comments on a question

```http
GET /questions/:id/comments
```

#### Create a comment on a question

```http
POST /questions/:id/comments
```

### Courses

#### Get courses

```http
GET /courses
```

#### Create course

```http
POST /courses
```

### Achievements

#### Get achievements

```http
GET /achievements
```

#### Post an achievement

```http
POST /achievements
```

### Account

All account endpoints require a bearer token for access

```http
Authorization: Bearer <token>
```

#### Get account courses

```http
GET /account/courses
```

#### Change account courses

```http
PUT /account/courses
```

#### Get all account achievements

```http
GET /account/achievements
```

#### Post a new achievement for an account

```http
POST /account/achievements
```

#### Get current daily streak

```http
GET /account/daily-streak
```

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

#### Update account profile picture

```http
POST /account/profile-picture
```

#### Change email

```http
PUT /account/email
```

#### Change password

```http
PUT /account/password
```

#### Delete account

```http
DELETE /account
```
