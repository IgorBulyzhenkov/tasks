<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

<h2>Version :</h2>
<ul>
    <li>
        <p style="font-size: 20px"> LARAVEL  <span style="color: red">10</span></p>
    </li>
    <li>
        <p style="font-size: 20px"> PHP <span style="color: red">8.3</span></p>
    </li>
    <li>
        <p style="font-size: 20px"> COMPOSER <span style="color: red">2.7</span></p>
    </li>
    <li>
        <p style="font-size: 20px"> <span style="color: red">PostgreSQL</span></p>
    </li>
    <li>
        <p style="font-size: 20px"> NPM  <span style="color: red">10</span></p>
    </li>
    <li>
        <p style="font-size: 20px"> NODE.JS  <span style="color: red">min 18
    </span></p>
    </li>
</ul>

- [Docker install](#docker-install)
- [Install Laravel](#install-laravel)
  - [Commands of first install](#commands-of-first-install)
  - [For update](#--for-update)
  - [Full reinstall database tables](#full-reinstall-database-tables)
- [Install React](#install-react)
  - [Libraries](#libraries) 
  - [Getting Started with Create React App and Redux](#getting-started-with-create-react-app-and-redux)
  - [Available Scripts](#available-scripts)
- [REST API](#rest-api)
  - [Auth](#auth)
    - [Sing up](#sing-up)
    - [Login](#login)
    - [Verify email](#verify-email)
    - [Send email again](#sand-email-again)
    - [Logout](#logout)
    - [Current user](#current-user)
  - [Task List](#task-list)
    - [Task list](#task-list)
    - [Task list id](#task-list-id)
    - [Create task list](#create-task-list)
    - [Update task list](#update-task-list)
    - [Delete task list](#delete-task-list)
  - [Tasks List](#tasks)
    - [Tasks list](#tasks-list)
    - [Tasks id](#tasks-id)
    - [Create tasks](#create-tasks)
    - [Update tasks](#update-tasks)
    - [Delete tasks](#delete-tasks)
  - [Users List](#users-list)
    - [Users List](#users-list)
    - [Search user](#search-user)
    - [User bind to task](user-bind-to-task)

Clone the project and in the terminal go to the level with the backend and frontend folders

### docker install

    docker-compose up -d

Next, go to the backend folder and run the list of commands

## INSTALL LARAVEL

### commands of first install

```
composer install

php artisan key:generate
php artisan migrate

npm install
```

#### - for update
```
composer install

php artisan cache:clear
php artisan config:clear
php artisan route:clear

php artisan migrate

npm install
```

### full reinstall database tables
```
php artisan migrate:fresh --seed
```
<p align="center">
 <img align="center" width="300" height="300" src="https://cdn-images-1.medium.com/max/512/1*6kK9j74vyOmXYm1gN6ARhQ.png">
</p>

## INSTALL REACT

## Libraries

List of libraries I used in this project

| Libraries         | NPM                                             |
|-------------------|-------------------------------------------------|
| Redux             | https://www.npmjs.com/package/redux             |
| Redux-Tulkit      | https://www.npmjs.com/package/@reduxjs/toolkit  |
| redux-persist     | https://www.npmjs.com/package/redux-persist     |
| react-router-dom  | https://www.npmjs.com/package/react-router-dom  |
| react-dom         | https://www.npmjs.com/package/react-dom         |
| prop-types        | https://www.npmjs.com/package/prop-types        |
| axios             | https://www.npmjs.com/package/axios             |
| react-icons       | https://www.npmjs.com/package/react-icons       |
| react-spinners    | https://www.npmjs.com/package/react-spinners    |
| react-toastify    | https://www.npmjs.com/package/react-toastify    |
| redux-logger      | https://www.npmjs.com/package/redux-logger      |
| web-vitals        | https://www.npmjs.com/package/web-vitals        |

## Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm install`

Before starting the project locally, first you need to do npm install in order to install all the libraries from package.json.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

## REST API

### AUTH

### Sing up

Request `POST /api/v1/auth/signup`

    Body: { "name": string, "nickName": string, "email": string, "password": string|min-length:6 }

Response `201 Created`

    { 
      "success": bool,
      "message": string,
      "data": {
        "name": string,
        "email": string,
        "nickName": string,
        "verificationToken": string
      }
    }

Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

### Login

Request `POST /api/v1/auth/login`

    Body: { "email": string, "password": string|min-length:6 }

Response `200 Ok`

    {
      "success": bool,
      "message": string,
      "data": {
        "name": string,
        "email": string,
        "nickName": string,
        "token": string,
        "verify": string
      }
    }

Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

### Verify email

Request `POST /api/v1/auth/verify-email`

    Body: { "verification_token": string }

Response `200 Ok`

    {
      "success": bool,
      "message": string,
      "data": {
        "name": string,
        "email": string,
        "nickName": string,
        "token": string,
        "verify": bool
      }
    }

Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

### Send email again

Request `POST /api/v1/auth/send-again`

    Body: { "email": string }

Response `200 Ok`

    {
      'success': true,
      'message': string,
      'verificationToken': string
    }

Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

### Logout 

Request `GET /api/v1/logout`

    Authorization: Bearer Token

Response `200 Ok`

    {
      'success': bool,
      'message': string
    }

Bad Response `401 Unauthorized`

    {
      'success': bool,
      'message': string
    }

### Current user

Request `GET /api/v1/current-user`

    Authorization: Bearer Token

Response `200 Ok`

    {
      {
        "success": bool,
        "message": string,
        "data": {
          "name": string,
          "email": string,
          "nickName": string,
          "token": string,
          "verify": string
      }
    }
    

Bad Response `401 Unauthorized`

    {
      'success': bool,
      'message': string
    }


## Task List

### Task list

Request `GET /api/v1/task-list`

    Authorization: Bearer Token

Response `200 Ok`

    {
      "success": bool,
      "data": {
        "data": [
            {
                "id": number,
                "name": string,
                "description": null,
                "is_completed":string,
                "created_at": string,
                "updated_at": string,
                "user": string,
                "permission": string
            }
        ],
        "current_page": number,
        "limit": number,
        "total_records": number,
        "total_pages": number
      }
    }


Bad Response `401 Unauthorized`

    {
      'success': bool,
      'message': string
    }

### Task list id

Request `GET /api/v1/task-list/{id}`

    Authorization: Bearer Token

Response `200 Ok`

    {
      "success": bool,
      "message": string,
      "data": {
        "id": number,
        "name": string,
        "description": null,
        "created_at": string,
        "is_completed": string,
        "user": string
      }
    }

Bad Response `403 Forbidden`

    {
      'success': bool,
      'message': string
    }

Bad Response `404 Not Found`

    {
      'success': bool,
      'message': string
    }

### Create task list

Request `POST /api/v1/task-list`

    Authorization: Bearer Token

    `Body: { "name": string, "description": string, "is_completed": string }`

Response `201 Created`

    {
      "success": bool,
      "data": {
        "id": number,
        "name": string,
        "description": string,
        "created_at": string,
        "is_completed": string,
        "user": string
      }
    }


Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

Bad Response `403 Forbidden`

    {
      'success': bool,
      'message': string
    }

### Update task list

Request `PUT /api/v1/task-list/{id}`

    Authorization: Bearer Token

    `Body: { "name": string, "description": string, "is_completed": string }`

Response `200 OK`

    {
      "success": bool,
      "message": string,
      "data": {
        "id": number
        "name": string,
        "description": string,
        "created_at": string,
        "is_completed": string,
        "user": string
      }
    }

Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

Bad Response `403 Forbidden`

    {
      'success': bool,
      'message': string
    }

Bad Response `404 Not Found`

    {
      'success': bool,
      'message': string
    }

### Update task list

Request `DELETE /api/v1/task-list/{id}`

    Authorization: Bearer Token

Response `204 No Content`

Bad Response `400 Bad Request`

    {
      'success': bool,
      'message': string
    }

Bad Response `401 Unauthorized`

    {
      'success': bool,
      'message': string
    }

Bad Response `403 Forbidden`

    {
      'success': bool,
      'message': string
    }

Bad Response `404 Not Found`

    {
      'success': bool,
      'message': string
    }