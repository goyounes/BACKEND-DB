this application is a combination of :
- a MYSQL Database
- an Api that serves and handles interacting with the DB
- a server that consumes the api and serves static and dynamically rendered pages

to begin you need to : 

1) database config
- download and instal MYSQL on your machine, make sure to remember the password to the "root" user
- lunch mysql by opening terminal on your machine and typing "mysql -u root -p" and then entering your password
- create cinephoria database by runing the command "CREATE DATABASE cinephoria;"
- in mysql comand line run "source pathToTheProjectFolder\sql_scripts\creation.sql;" //for simplicity reasons images wont be included,
 use "source pathToTheProjectFolder\sql_scripts\backup.sql;"
- now the db is set and is filled with mock data.




2) api config
- create a .env file in the directory /db_api, with the following information :
    MYSQL_HOST = "127.0.0.1"        #localhost
    MYSQL_USER = "root"             #username for mysql database
    MYSQL_PASSWORD = "password"     #password used for the mysql account registered while setting mysql up
    MYSQL_DATABASE = "cinephoria"   #the name of the database we will be interacting with
    DB_SERVER_PORT=5000             #the port that the application is set to. prefer to not change this.

- open the terminal and run "npm install" to download all the required dependancies of the project
- run the command "node .\db_api\api.js" from the root of the directory,  now the API is setup and listening on PORT 5000

3) server config
- create a .env file in the main folder of this project with the following information :
    DB_API_URL = "http://127.0.0.1:5000/api/v1"

5000 stands for the port where the API is listening on.
- run the command "node .\server.js" from the root of the directory 

now open the page "localhost:3000" to acces the website
to interact with the api use "localhost:5000/api/v1/...."