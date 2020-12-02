# This is a node, mongoose, mongodb REST API

#### Before starting the server, be sure to run `npm install` in the project folder.

### To start the server run the following command at the folder root. ###`npm start`

### To start the server with nodemon run the following command at the folder root. ###`npm run dev`

## The following are the routes available in this api

| Route                                   | verb   | queries          | result                                            |
| --------------------------------------- | ------ | ---------------- | ------------------------------------------------- |
| /api/users                              | GET    |                  | all users sorted by createdAt                     |
| /api/users                              | GET    | page=2,perPage=4 | gives 4 results on page 2, Pagination available   |
| /api/users                              | POST   |                  | posts a new user on to the database               |
| /api/users/:id                          | PATCH  | id               | use id from get users to update the user          |
| /api/users/:id                          | DELETE | id               | use id from get users to delete the user          |
| /api/users?lat=17.455827&long=78.427935 | GET    | lat,long         | users near the given lat and long in sorted order |
