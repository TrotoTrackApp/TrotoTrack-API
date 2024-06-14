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

## API Documentation (BELUM)
We use Swagger UI as the API documentation, running at  http://api.trototrack.online


## Running Project

### Environment :
```
Node v18.17.1
npm 10.2.4
```

### Haven't installed NPM yet?
```
Windows version:
Download on https://nodejs.org/en/download/

Cek instalasi : 
$ node -v
$ npm -v

Lets dev!
```

### Deploy Development Mode :
```
WINDOWS :
$ npm install init
$ npm run start
Akses localhost:8080

LINUX (UBUNTU) :
Install Node & NPM first :
$ curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ npm install init
$ npm run start
Akses localhost:8080
```

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





