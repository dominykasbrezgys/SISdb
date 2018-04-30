# School Information System database initialiser

This is the application, which is used to initialise and populate the database for The School Information System

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Different branches

In order to run this by using MySQL server on the localhost, please checkout the **master** branch.
For using it with the remote MySQL server, checkout the **remote-mysql-server** branch


### Prerequisites

In order to run a Node.js application, download appropriate version of Node.js from [here](https://nodejs.org/en/download/) 


### Running

Before running the application or tests you will need to obtain credentials for acccessing the external MySQL server. It can be found in section 5.2.4 of the final report associated with this application.


In order to run the application please execute the following command in the root direcotry of this project

```
node db_init.js
```
and then 

```
node db_populate.js
```

## Authors

* **Dominykas Brezgys**


