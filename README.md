<p align="center">
  <img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/TrotoTrack%20Logo.png" alt="Nama Alternatif" style="transform: scale(10);"> 
</p>

---
## Table of Contents

- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Running Project](#running-project)
- [How to deploy to Cloud Run](#how-to-deploy-to-cloud-run)
- [CI/CD Platform](#cicd-platform)
- [Team Back-End](#team-back-end)
- [References](#references)

## Folder Structure
```
├── app                            
│   ├── config                      # configuration connection any database
│   ├── database                    # any database connection
|   ├── migrate                        
│   └── route                      
├── features
│   └── feature(a,b,c)              #this structure is the same for all of the features
|       |── controller
|       |   └── controller.js  
│       ├── dto                    
│       │   ├── request.js
│       │   └── response.js
│       ├── entity
│       │   ├── entity.js          
│       │   ├── interface.js       # interface contract for all function repository and service 
│       │   └── mapping.js         # mapping struct main to model or model to main
│       ├── model      
│       │   └── model.js            # structure database 
│       ├── repository
│       │   └── respository.js      # query for manipulating data
│       └── service
│           └── service.js          # contains the core business logic of the application and validation
├── utils                         
```

## Introduction
Trototrack is an innovative application designed to streamline and expedite the process of reporting sidewalk defects. It leverages advanced technologies to simplify the identification and monitoring of damaged sidewalks, ensuring a safer and more accessible environment for pedestrians.

## Tech Stack
![header-sub-header-body-text-header-3](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/291099608-f3c11700-2425-4b8d-b4d7-9010801f5832.png)
![Static Badge](https://img.shields.io/badge/Cloud_SQL-cloudsql?style=for-the-badge&logo=google-cloud&logoColor=white&color=%234ba185)
![Static Badge](https://img.shields.io/badge/Sequelize-sequelize?style=for-the-badge&logo=sequelize&logoColor=white&color=%232496ED)
![Static Badge](https://img.shields.io/badge/Express.js-express?style=for-the-badge&logo=express&logoColor=black&color=%2385EA2D&)
![Static Badge](https://img.shields.io/badge/mysql-s?style=for-the-badge&logo=mysql&logoColor=white&color=%234479A1)
![Static Badge](https://img.shields.io/badge/docker-s?style=for-the-badge&logo=docker&logoColor=white&color=%232496ED)
![Static Badge](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Static Badge](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Static Badge](https://img.shields.io/badge/openai-s?style=for-the-badge&logo=openai&logoColor=white&color=%23412991)

## Installation Guide
Follow these steps to set up and run the Trototrack application on your local machine. This guide will help you clone the repository, install necessary dependencies, configure the environment, and set up the database.
### Step 1: Clone the Repository
Begin by cloning the Trototrack API repository from GitHub. Use the following command to clone the repository to your local machine:
```
git clone https://github.com/TrotoTrackApp/TrotoTrack-API.git
```

### Step 2: Choose the Branch
The main branch contains the stable version of the application, which has been thoroughly tested and deployed. However, if you prefer to work with the latest development features, you can switch to the development branch. Use the commands below to switch branches:
```
# Switch to the main branch
git checkout main

# Or switch to the development branch
git checkout development
```

### Step 3: Install Dependencies
Navigate to the project directory and install the necessary dependencies using npm. This ensures all required packages are available for the application to run smoothly.
```
cd TrotoTrack-API
npm install
```

### Step 4: Configure the Environment
Create a .env file in the root directory of the project. This file will contain your environment-specific configurations, such as database credentials and API keys. You can use the .env.example file provided as a template. Copy and customize it according to your environment:
```
cp .env.example .env
```
Open the .env file in a text editor and replace the placeholder values with your actual configuration details. Here are some typical environment variables you might need to set:
```
PORT=3000
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=trototrack
JWT_SECRET=your_jwt_secret
```

### Step 5: Configure the Database
The application comes with a default database configuration located in app/database. If you need to use a different database, update the configuration in this directory.

## Usage
* Start the application by running the following command:
```
npm run start
```
* Connect to the API using Postman on port 8080.


## API Endpoint
### Users

| HTTP Verbs                                                                         | Endpoints             | Query Params                | Action                                 | Authorized |
| ---------------------------------------------------------------------------------- | --------------------- | --------------------------- | -------------------------------------- | ---------- |       
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/POST.png)   | `/register`           |                             | To sign up a new user account          | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/POST.png)   | `/login`              |                             | To login an existing user account      | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/POST.png)   | `/send-otp`           |                             | Send otp for forget password           | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/POST.png)   | `/verify-otp`         |                             | Verify the OTP received via email      | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/verify `            | `token`                     | Verify user account recevied via email | No         |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/PATCH.png)  | `/new-password`       |                             | Set a new password                     | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/POST.png)   | `/scan`               |                             | Scan image sidewalk                    | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/profile`            |                             | Get user profile                       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/PUT.png)    | `/profile`            |                             | Update user profile                    | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/PATCH.png)  | `/profile`            |                             | Update password user                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/articles`           |                             | Get all articles                       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/articles/:id`       |                             | Get details articles                   | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/POST.png)   | `/reports`            |                             | Create a new report sidewalk           | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/reports`            | `limit`, `page`, `search`   | Retrieve all report sidewalk           | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/reports/profile`    | `limit`, `page`, `search`   | Retrieve sidewalk reports profiles     | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/GET.png)    | `/reports/:id`        |                             | Retrieve sidewalk reports details      | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/PUT.png)    | `/reports/:id`        |                             | Update sidewalk reports profiles       | Yes        |
| ![](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/PUT.png)    | `/reports/:id/upvote` |                             | Upvote sidewalk reports                | Yes        |



## How to deploy to Cloud Run & CI/CD Setup
  - First, create a [Dockerfile](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/development/Dockerfile) containing all the package needed
  - Deploy cloud run using GitHub Actions

  - ## CI/CD Setup
    We use [deploy.yaml](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/development/.github/workflows/deploy.yml) for trigger CI/CD using GitHub Actions :
    
    ![Screenshot 2024-06-09 134233](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/Screenshot%202024-06-09%20134645.png)

- Custom Domain

  Mapping domain with any DNS management , configuration mapping [here](https://console.cloud.google.com/run/domains). Click `Add Mapping`, And you can choose from 3 different ways of mapping domains, either using a custom domain with a load balancer, a custom domain with Cloud Run, or a custom domain with Firebase Hosting.

  ![Screenshot from 2023-12-18 11-06-44](https://github.com/RecyThing/RecyThing-API/assets/66883583/e8a32da4-0850-4ab1-87bf-d20e87dafda7)

  You will receive DNS records and add that configuration to the DNS Management in the platform where your domain is located



## Team Back-End

| Name                           | University	                                         | 
| :----------------------------- | :---------------------------------------------------| 
|	Al Hilaluddin                  | Universitas Muslim Indonesia                        |
|	Ardhian Wisnu Kartika          | Universitas Telkom                                  |	


## References

 ## Technologies and Tools

- [Cloud Run](https://cloud.google.com/run?hl=id) : Deployment Platform
- [Cloud SQL](https://cloud.google.com/sql) : Managed database service for relational databases
- [Sequelize](https://sequelize.org/) : Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server
- [Express.js](https://expressjs.com/) : Fast, unopinionated, minimalist web framework for Node.js
- [MySQL](https://www.mysql.com/) : The world's most popular open source database
- [Docker](https://www.docker.com/) : Platform for developing, shipping, and running applications
- [OpenAPI](https://www.openapis.org/) : Standard for defining APIs
- [OpenAI](https://www.openai.com/) : Research organization that promotes and develops friendly AI





