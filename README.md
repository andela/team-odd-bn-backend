[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)
[![Build Status](https://travis-ci.org/andela/team-odd-bn-backend.svg?branch=develop)](https://travis-ci.org/andela/team-odd-bn-backend)
[![Coverage Status](https://coveralls.io/repos/github/andela/team-odd-bn-backend/badge.svg?branch=develop)](https://coveralls.io/github/andela/team-odd-bn-backend?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/97cfd183a562e8b5d53f/maintainability)](https://codeclimate.com/github/andela/team-odd-bn-backend/maintainability)

Barefoot Nomad - Making company travel and accomodation easy and convinient.
=======

## Vision
Make company global travel and accommodation easy and convenient for the strong workforce of savvy members of staff, by leveraging the modern web.

---

## Documentation

For API documentation, please visit [Barefoot Docs](https://team-odd-bn-backend-staging.herokuapp.com/api-docs/)

## Setting Up The Application

### A. Clone the Application

1. Open your terminal 

2. Run `clone https://github.com/andela/team-odd-bn-backend.git` OR [Download](https://github.com/andela/team-odd-bn-backend/archive/develop.zip) the project

### B. Setting up the environment

1. **rename** a `.env.example` to `.env` file

2. Then add the values to all environmental variables in `.env` file
 
3. Install postgres

4. When the server is running, create a database on your new PG server. Ensure your new development database is the same name as your ` barefoot_nomad_dev_db `  and your test database is the same name as ` barefoot_nomad_test_db  ` environment variables

5. Ensure you have Postgres running 

### B. Running the application

In your terminal:

1. Run `npm install` to install all dependencies

2. For **Testing**: run `npm run test`

3. Drop Tables run `npm run dropTables` to make sure you have update changes

4. Migrate database `npm run db-migrate` 

5. Then populate db with seed data, run `npm run db-migrate-dev`

6. For **Development**: run `npm run dev-start`

7. Access ` http://localhost:<:APPLICATION_PORT> ` (by default, the port is `3000`) in Postman, if app is running correctly, you will get a response with a message:

    ```javascript
   { 
       "message": "Welcome to Barefoot Nomad."
   }
    ```
# Author :computer:
 Team-odd

