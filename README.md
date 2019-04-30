# Showroom Take Home

## General Description

**Requirements for the take home-assignment in the [following document](./REQUIREMENTS.md)**

Some noteworthy requirements from the above:
- **Make sure to prepopulate your database with data**
- The app does **not** need user authentication, and does not need passwords - only usernames

## Summary

A summary of what has been completed can be found in the [following document](./SUMMARY.md). It details what objectives/ tasks have been completed, and what will probably need fixing.

## Installation And Usage

### Quick Setup

You'll need the following to run everything on this:
- [Node](https://nodejs.org/en/)
  - **NOTE** the backend scripting on this uses some ES7 syntax so a node version **at or above** v8.6.0 is recommended!
- [Git](https://git-scm.com/)
- [SQLite](https://www.sqlite.org/download.html)
- [Postman](https://www.getpostman.com/) to test backend routes

The database for the assignment is located in `./backend/database` and is called `database.db`
- it runs on SQLite(https://www.sqlite.org/index.html)

You can download a local copy of this repo by downloading it directly from the repo or by using:
  ```
  git clone https://github.com/wilsonj806/showroom-take-home.git
  ```

In order to install the packages specified in `package.json` and `frontend/package.json`, you'll need NPM. NPM comes included with most newer versions of Node.js, which is linked above.

To install the packages you'll need use the following:
  ```
  npm install

  cd ./frontend

  npm install
  ```
This will install the packages required in **both** the root directory and by the `./frontend` directory

### Run The App

To run the app, you'll be using the following command:
```
  npm run dev
```
Alternatively you can run the below if you want to use two separat terminals:
```
  npm run server

  npm run frontend
```

This should open the frontend/ the webapp on PORT 3000 and start a server on PORT 5000.

### Missing Database?

If the `./backend/database/database.db` file is unreadable by SQLite or missing, you'll need to make a new `database.db` file in to replace it.

Once that's done, you can run either of the following to populate the database:
- If SQLite is added to your PATH variables:
```
cd <project-directory-here>

sqlite3 backend/database/database.db

cd backend/database

.read setup-tables.txt

.read setup-unique-entries.txt

.read setup-shows.txt

.read setup-comments.txt
```
- If SQLite isn't added to your PATH variables:
```
cd <directory-of-SQLite-here>

sqlite3 <project-directory/backend/database/database.db>

cd <project-directory-here>

cd backend/database

.read setup-tables.txt

.read setup-unique-entries.txt

.read setup-shows.txt

.read setup-comments.txt
```