# Movie API Documentation

## Endpoints :

List of available endpoints:

<li>'POST /movies'
<li> 'GET /movies'
<li> 'GET /movies/:id'
<li> `GET /movies/histories`
<li> `PUT /movies/:id`
<li> `PATCH /movies/:id`
<li> `PUT /genres/:id`
<li> 'DELETE /movies/:id'
<li>'POST users/register'
<li> 'POST users/login'
<li> 'POST users/google-sign-in'
<li> 'GET /genres'
<li> 'POST /genres'
<li> 'DELETE /genres/:id'

&nbsp;

## 1. POST /movies

Description:

<li>add movie

-.body:

```json
{
  "title": "string",
  "synopsis": "text",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer"
}
```

\_Respone (201-Created)

```json
{
  "title": "string",
  "synopsis": "text",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required"
}
OR
{
  "message": "synopsis is required"
}
OR
{
  "message": "rating is required"
}
OR
{
  "message": "Minimal rating is 1"
}
```

&nbsp;

## 2. GET /movies

Description:

<li>Get all movie from database

Request:

_Response (200 - OK)_

```json
[
  {
    "title": "One Piece",
    "synopsis": "tes tes tes",
    "trailerUrl": "youtube.com",
    "imgUrl": "image.com",
    "rating": 5,
    "genreId": 1,
    "authorId": 1
  },
  {
    "title": "Attack on Titan",
    "synopsis": "tes tes tes",
    "trailerUrl": "youtube.com",
    "imgUrl": "image.com",
    "rating": 5,
    "genreId": 1,
    "authorId": 1
  },
  ...
]
```

&nbsp;

## 3. GET /movies/:id

Description:

<li>Get movie by id

Request:

<li>params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  {
    "title": "One Piece",
    "synopsis": "tes tes tes",
    "trailerUrl": "youtube.com",
    "imgUrl": "image.com",
    "rating": 5,
    "genreId": 1,
    "authorId": 1
}
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 4. DELETE /movies/:id

Description:

<li> Delete movie by id

Request:

<li> params

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "message": "<movie title> success to delete"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "data not found"
}
```

&nbsp;

## 5. POST users/register

Description:

<li> Register user account

Request:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string"
}
```

_Response (201 - Created)_

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "phoneNumber": "string",
  "address": "string",
  "role": "admin"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required !"
}
OR
{
  "message": "Password is required !"
}
```

&nbsp;

## 6. POST users/login

Description:

<li>Login user account with email and password as admin

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - Ok)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required !"
}
OR
{
  "message": "Password is required !"
}
```

&nbsp;

## 7. POST users/google-sign-in

Description:

<li> Login user account with Google account as staff
_Response (200 - Ok)_

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "staff"
}
```

&nbsp;

## 8. GET /genres

Description:

<li> Get all genre from database

Request:

- headers:

```json
{
  "acces_token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Drama"
  },
  {
    "id": 2,
    "name": "Action"
  },
  {
    "id": 3,
    "name": "Anime"
  },
  ...,
]
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid token"
}
```

&nbsp;

## 9. POST /genres

Description:

<li> Create Genre to database

Request:

- body:

```json
{
  "name": "string"
}
```

- headers:

```json
{
  "acces_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "name": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required !"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid token"
}
```

&nbsp;

## 10. DELETE /genres/:id

Description:

<li> Delete genre by id

Request:

- params:

```json
{
  "id": "integer (required)"
}
```

- headers:

```json
{
  "acces_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "<genre name> success to delete"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "invalid token"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "error not found"
}
```

&nbsp;

## 11. PUT /movies/:id

Description:

- Edit movie by id

Request:

- headers:

```json
{
  "token": "string"
}
```

- user:

```json
{
  "id": "integer (required)",
  "email": "string"
}
```

- params:

```json
{
  "movieId": "integer (required)"
}
```

- body:

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "<movie id> has been updated"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Action"
}
```

_Response (404 - NOT FOUND)_

```json
{
  "message": "Data Not Found"
}
```

&nbsp;

## 12. PATCH /movies/:id

Description:

- Update status movie by id

Request:

- headers:

```json
{
  "token": "string"
}
```

- user:

```json
{
  "email": "integer (required)"
}
```

- params:

```json
{
  "movieId": "integer (required)"
}
```

- body:

```json
{
  "status": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success to edit satatus movie with id <movie's id>"
}
```

&nbsp;

## 13. GET /movies/histories

Description:

- Get logs after create and update

Request:

- headers:

```json
{
  "token": "string"
}
```

_Response (200 - OK)_

```json
[
  {
    "name": "movie 1",
    "description": "new entity with id <new movie's id> created",
    "updatedBy": "user1@mail.com"
  }
]
```

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
