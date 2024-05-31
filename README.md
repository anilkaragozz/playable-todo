
# Playable Todo-App

This project is prepared for the job application process for Playable company.

- There are two separate files named `backend` and `frontend` in the project which is named `playable-todo`. Backend file is an api project developed using Node.js based Express.js framework. Frontend file is a wep application developed using Vite+React.js+Ts technologies.

## Features

CRUD operations with Node.js based api
 - REST API was created using express.js framework, where the user can Create Read Read Update Delete.
-----
JWT based authentication
- Generated a unique ID token for the user using the jsonwebtoken package
---
Database connection with MongoDB
- MongoDB integration with user information and private connection address to .env file in NodeJs project using mogoose package
-------------
Validation
 - validation processes with zod on the frontend side and express-validator packages on the backend side have been edited/controlled
----------
User friendly UI
- ShadcnUI package was preferred for the development of the frontend project, React-hook-form package was preferred for form management, and TailwindCss package was preferred for Css developments. 
-------------
Register User & Login User
- An application that can be preferred for multiple users with its user registration and login feature. When user registration is done, user registration will be provided after filling in the Register Form correctly, and in order to log in, it will be sufficient to fill in and save the form with the registered user information. `ps: (email: anil@test.com, password: 123456)`  
------


## Installation
`PS:NodeJs must be installed on your local machine for both projects to work https://nodejs.org/en/download/package-manager`

1 - Clone the Repository

https://github.com/anilkaragozz/playable-todo.git

2 - Open the project with any code editor

3 - Open a terminal screen and go to porject director on your local machine

```bash
  cd playable-todo
```
```bash
  cd backend
```
4 - If you have reached the backend directory on your local machine 
```bash
  npm install
```
```bash
  npm run build
```
```bash
  npm run dev 
```
commands, the project started to work at http://localhost:8000
https://grey-station-546783.postman.co/workspace/Playable~3a8a79e9-f69e-4acb-a488-4f98e7106f60/collection/29142716-030f3e32-8d51-43c6-8382-a109cc0ac734?action=share&creator=29142716

5 - `ps: You can access the endpoints I created with the postman access link I will share with you.`

6 - The steps we need to follow to run the frontend project are respectively
7 - on a different terminal screen
```bash
  cd frontend 
```
8 - After gaining access to the file location  
```bash
  npm install
```
```bash
  npm run build
```
```bash
  npm run dev 
```
9 - When we complete the steps respectively, our frontend project will be running at http://localhost:3000 

10 - Both projects are expected to work in an integrated manner after they are adjusted. 




## Authors

- [@anilkaragozz](https://www.github.com/anilkaragozz)
- if you want to reach; [anilkaragoz89@gmail.com](anilkaragoz89@gmail.com)

