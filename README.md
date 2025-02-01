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

### Favorite a question

```http
POST /questions/:id/favorites
```

### Unfavorite a question

```http
DELETE /questions/:id/favorites
```

### Comments

#### Get question comments

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

#### Change courses

```http
PUT /account/courses
```

### Get all account achievements

```http
GET /account/achievements
```

### Post a new achievement for an account

```http
POST /account/achievements
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
