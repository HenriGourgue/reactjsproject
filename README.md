# Table of contents

- [Project description](#project-description)
- [Installation](#installation)
  * [Recover project](#recover-project)
  * [Install dependencies](#install-dependencies)
  * [Import the sql schema](#import-the-sql-schema)
- [Launch app](#launch-app)

# Project description

This project was made for Ydays class at Bordeaux Ynov campus.

It's a project made with React JS.

The goal of the project is to create an application that allows you to search for beers, consult their details and possibly add one or more beers to the favorites management system.

The application consists of a server (expressJS) and the client (React JS). The purpose of the server is to manage the users as well as the favorite beers associated with these users.

# Installation

## Recover project

To clone the project, use the command below:

```sh
git clone https://github.com/HenriGourgue/reactjsproject.git
```

## Install dependencies

It is necessary to install both the dependencies of the server as well as those of the client.

To do this, from the root of the project, carry out the following commands:

- For the server:
```sh
cd ./server && npm i
```

- For the client:
```sh
cd ./client && npm i
```

## Import the sql schema

There is an SQL script to clone the sql schema. First you'll need to create the database.
By default, the database used for the server is "**beers**" with the user "**root**" and passsword "**root**".
To change the default sql config, open server/server.js andd edit "**connection**" paramater.

You'll need to execute the next coommand from the root path:

```sh
mysql <db_name> -u <user> -p <password> < ./server/Database/create.sql
```

# Launch app

To launch the application, you must start the server and the client, execute the following commands from the root path:

- For the server:
```sh
cd ./server && npm start&
```

- For the client:
```sh
cd ./client && npm start&
```

App should run on: ``` http://localhost:3000 ``` 
Server should run on: ``` http://localhost:3001 ```
