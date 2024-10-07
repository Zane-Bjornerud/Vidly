# Vidly - Movie Rental Service

Vidly is a backend application for a movie rental service built using Node.js and Express. The purpose of this project is to demonstrate key concepts in backend development, including RESTful API design, database interactions using MongoDB, user authentication/authorization with JWT (JSON Web Tokens), and Unit & Integration Testing with Jest. 

## Features
* User Management: Supports user registration, authentication, and role-based access control (admin/user).
* Movies: Manages the list of movies, genres, and stock levels.
* Customers: Allows for adding, editing, and deleting customer information.
* Rentals: Manages movie rentals and returns.
* Payments: Tracks rental fees based on the duration of the rental period.
* Authentication and Authorization: Implements user authentication with JWT and role-based access for admin actions.

## Technologies Used
* Node.js: JavaScript runtime for the backend.
* Express: Fast, minimalist web framework for Node.js.
* MongoDB: NoSQL database to manage movie and rental data.
* Mongoose: ODM (Object Data Modeling) library for MongoDB.
* JWT: JSON Web Tokens for secure authentication.
* Joi: Data validation library for request validation.
* Lodash: Utility library for working with objects and arrays.

## Test Coverage
![image](https://github.com/user-attachments/assets/770ab382-e2a1-4c12-bd11-f9bc53e391ef)

## Getting Started
### Prerequisites
Before running the project, ensure that you have the following installed:

* Node.js (v14 or higher)
* MongoDB (running locally or via a cloud service like MongoDB Atlas)
### Installation
1. Clone the repository:
```
git clone https://github.com/Zane-Bjornerud/vidly.git

cd vidly
```
2. Install the project dependencies:
```
npm install
```
3. Set up the environment variables. Create a .env file in the root directory and add the following:
```
PORT=3000

MONGO_URI=mongodb://localhost/vidly
```
4. Start the MongoDB service:
```
mongod
```
5. Run the application:
```
node index.js
```
The server should now be running on http://localhost:3000

## API Endpoints
| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | /api/movies | Get all movies |
| GET | /api/movies/:id | Get a single movie by ID |
| POST | /api/movies | Add a new movie (Admin only) |
| PUT | /api/movies/:id | Update a movie (Admin only) |
| DELETE | /api/movies/:id | Delete a movie (Admin only) |
| GET | /api/customers | Get all customers |
| GET | /api/rentals | Get all rentals |
| POST | /api/rentals | Rent a movie |
| POST | /api/users | Register a new user |
| POST | /api/auth | Authenticate user and get a token |

## Running Tests
To run the tests:
```
npm test
```
Make sure your test environment is properly set up before running tests.

***CURRENTLY WORKING ON DEPLOYMENT***
