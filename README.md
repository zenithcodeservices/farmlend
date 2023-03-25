
# Farmlend Assessment

This is an assessment to be submitted to Farmlend in London, England.

# Instructions

To run this project, you will need to have Node.js and PostgreSQL installed on your computer.

Here are the steps to run the project:

Clone the repository to your local machine.

In the farmlendAPI directory, create a file named .env and add the following environment variables:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_NAME=your_db_name
```


Replace your_db_user, your_db_password, your_db_host, your_db_port, and your_db_name with your own database credentials. These environment variables will be used by the pg library to connect to your PostgreSQL server.

In the farmlendAPI directory, run the following command to install the dependencies:
```
yarn
```
Run the following command to start the API server:
```
node server.js
```
This will start the API server on port 3000.

In the farmlend_client directory, run the following command to install the dependencies:
```
yarn
```
Run the following command to start the Next.js client:
```
yarn next -p 3001
```
This will start the client on port 3001.

Open your browser and go to http://localhost:3001 to see the client.

**Note: The API server assumes that you have created the PostgreSQL tables. You can use pgAdmin to set up a postgreSQL database using the queries stored in the postgresql directory which includes sample data.**

Alternatively, you can run
```
docker compose up
```
in the root directory, this will build the client and API in a dockerized container.




