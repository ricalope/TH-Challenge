# Mock TakeHome Challenge Solution Startup Instructions

1. Clone this Repository.

2. Install dependencies using:
```bash
pipenv install -r requirements.txt
```

3. Create a .env file at the root of the file and create a SECRET_KEY variable with a secret key of your choosing.

4. This repo utilizes sqlite3 so make sure to set the path to sqlite3 in the .env as well.

5. After you have set the sqlite path in the .env file, cd into the backend folder and run:

```bash
pipenv shell
```

```bash
flask db upgrade
```

```bash
flask seed all
```

6. To start up the backend server (while still in the pipenv shell) run:

```bash
flask run
```

7. Next you will need to cd into the frontend folder and run:

```bash
npm install
```

8. To start up React run:

```bash
npm start
```

### And thats it! After you've run both the backend and frontend servers it should automagically open a browser window and you are all set!
