---
# YelpCamp - Fullstack MERN

Welcome to my YelpCamp project repository! This full CRUD project, built as part of "The Web Developer Bootcamp" by Colt Steele, significantly enhanced my knowledge of Express, Node, MongoDB, and EJS. The project demonstrates a comprehensive full-stack web development workflow, from setting up the server to deploying the application. You can view the live version of this project [here](https://yelp-camp-fullstack-mern-66yo.onrender.com/).

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Lessons Learned](#lessons-learned)

## Introduction

YelpCamp is a full-stack web application where users can create, view, edit, and delete campgrounds and reviews. This project involved creating multiple routes, implementing authentication and authorization, and deploying the application using Render.

## Features

- **Full CRUD Operations**: Create, read, update, and delete campgrounds and reviews.
- **Authentication and Authorization**: User registration, login, and permission management using Passport.js.
- **Image Upload**: Upload and manage images using Cloudinary.
- **Responsive Design**: User-friendly interface with Bootstrap 5.
- **Data Validation**: Server-side validation with JOI.
- **Error Handling**: Custom error handling and validation messages.
- **Security**: Basic security measures including sanitization and using Helmet for setting HTTP headers.
- **Deployment**: Deployed on Render with environment variables and MongoDB Atlas for the database.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **EJS**: Embedded JavaScript templating.
- **Passport.js**: Authentication middleware.
- **JOI**: Data validation library.
- **Cloudinary**: Image upload and management.
- **Bootstrap 5**: Front-end framework.
- **Helmet**: Security middleware for HTTP headers.
- **Render**: Cloud platform for deployment.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/whispernet/yelp_camp-fullstack_mern.git
    ```

2. **Navigate to the project directory**:
    ```sh
    cd yelp_camp-fullstack_mern
    ```

3. **Install dependencies**:
    ```sh
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the root directory and add your environment variables (e.g., database URL, Cloudinary credentials).

5. **Start the server**:
    ```sh
    npm start
    ```

6. **Open your browser and navigate to**:
    ```
    http://localhost:3000
    ```

## Usage

Once the project is running locally or you visit the [live version](https://yelp-camp-fullstack-mern-66yo.onrender.com/), you can:

- **Register and Login**: Create an account or log in to an existing one.
- **Create Campgrounds**: Add new campgrounds with images and descriptions.
- **Edit and Delete Campgrounds**: Modify or remove your campgrounds.
- **Add Reviews**: Leave reviews on campgrounds.
- **Delete Reviews**: Remove your reviews.

## Lessons Learned

Throughout this project, I gained valuable insights into:

- **Express and Node.js**: Developing a robust backend server.
- **MongoDB and Mongoose**: Designing schemas and interacting with a NoSQL database.
- **EJS**: Creating dynamic views with embedded JavaScript.
- **Authentication and Authorization**: Implementing secure user authentication and managing permissions.
- **Image Upload and Management**: Using Cloudinary for handling image uploads.
- **Error Handling and Validation**: Creating custom error handlers and validating user input.
- **Deployment**: Deploying a full-stack application using Render.

---
