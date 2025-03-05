# MiniCommerce

**M**anage, \
**I**ntegrate, \
**N**avigate, and \
**I**nnovate \
Commerce

Welcome to MiniCommerce! This is a simple e-commerce data management web application built with React and Python. It allows ecommerce companies to easily manage and track users purchases.

## Introduction and short demo video

[![MiniCommerce Introduction](https://i9.ytimg.com/vi/BEFL-Ew1svw/mqdefault.jpg?sqp=CLS4nr4G-oaymwEmCMACELQB8quKqQMa8AEB-AGeBoACwgOKAgwIABABGFkgWShZMA8=&rs=AOn4CLBPhDnPpGld7w2AGc31KceZt-RuPQ)](https://youtu.be/BEFL-Ew1svw)

## Features

- Browse users purchases
- Verify user purchases
- Track user purchasing trend for a period of month

## Installation

1. Clone the repository.

This repository contains 2 folders - `frontend` and `backend`. The `frontend` folder contains the React application, while the `backend` folder contains the Python application and the SQL database example. The next steps will be separated into 2 sections for the frontend and backend.

### Backend

1. Navigate to the `backend` folder.
2. Create a virtual environment by running `python -m venv venv`. Or if you are using `pipenv`, you can run `pipenv shell` to activate the virtual environment. Or if you are using `conda`, you can run `conda create --name myenv` to create a new environment.
3. Install the required dependencies by running `pip install -r requirements.txt`.
4. Start the application with `python app.py`.

#### Additional Steps

Import the SQL database example by running the following command:

- if you are using `mysql`:

```bash
mysql -u username -p database_name < database.sql
```

- if you are using `postgresql`:

```bash
psql -U username -d database_name -a -f database.sql
```

- if you are using `sqlite`:

```bash
sqlite3 database.db < database.sql
```

- if you are using `mariadb`:

```bash
mariadb -u username -p database_name < database.sql
```

- if you are using `sqlserver`:

```bash
sqlcmd -S localhost -U username -P password -d database_name -i database.sql
```

- if you are using `oracle`:

```bash
sqlplus username/password@database_name @database.sql
```

- if you are using `db2`:

```bash
db2 connect to database_name
db2 -tvf database.sql
```

### Frontend

1. Navigate to the `frontend` folder.
2. Install the required dependencies by running `npm install`.
3. Start the application with `npm start`.
4. Visit the application in your web browser at `http://localhost:3000`.

## Usage

1. Visit the application in your web browser at `http://localhost:3000`.
2. Browse the users purchases.
3. Verify user purchases.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).
