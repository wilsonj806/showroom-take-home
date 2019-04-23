# Showroom Take Home

## General Description

**Requirements for the take home-assignment in the [following document](./REQUIREMENTS.md)**

Some noteworthy requirements from the above:
- **Make sure to prepopulate your database with data**
- The app does **not** need user authentication, and does not need passwords - only usernames

## Installation And Usage

You'll need the following to run everything on this:
- [Node](https://nodejs.org/en/)
- [**Optional:** Git](https://git-scm.com/)

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

If the `./backend/database/database.db` file is unreadable or missing, you'll need to make a new `database.db` file in to replace it. Once that's done, you can run either of the following to populate the database:
- If SQLite is added to your PATH variables:
```
cd <project-directory>

sqlite3 <project-directory/backend/database/database.db>

cd backend/database

.read setup-tables.txt

.read setup-entries.txt
```
- If SQLite isn't added to your PATH variables:
```
cd <directory-of-SQLite>

sqlite3 <project-directory/backend/database/database.db>

cd <project-directory>

cd backend/database

.read setup-tables.txt

.read setup-entries.txt
```