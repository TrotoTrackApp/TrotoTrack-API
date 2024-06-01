<p align="center">
  <img src="https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/TrotoTrack%20Logo.png" alt="Nama Alternatif" style="transform: scale(10);"> 
</p>

---
## Table of Contents

- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [API Documentation](#api-documentation)
- [Unit Testing](#unit-testing)
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
## Tech Stack
![header-sub-header-body-text-header-3](https://github.com/TrotoTrackApp/TrotoTrack-API/blob/readme/assets/291099608-f3c11700-2425-4b8d-b4d7-9010801f5832.png)
![Static Badge](https://img.shields.io/badge/Cloud_SQL-cloudsql?style=for-the-badge&logo=googlecloud&logoColor=white&color=%234ba185)
![Static Badge](https://img.shields.io/badge/Sequelize-sequelize?style=for-the-badge&logo=sequelize&logoColor=white&color=%232496ED)
![Static Badge](https://img.shields.io/badge/Express.js-express?style=for-the-badge&logo=express&logoColor=black&color=%2385EA2D&)
![Static Badge](https://img.shields.io/badge/mysql-s?style=for-the-badge&logo=mysql&logoColor=white&color=%234479A1)
![Static Badge](https://img.shields.io/badge/docker-s?style=for-the-badge&logo=docker&logoColor=white&color=%232496ED)
![Static Badge](https://img.shields.io/badge/swagger-s?style=for-the-badge&logo=swagger&logoColor=%2385EA2D&color=black)
![Static Badge](https://img.shields.io/badge/openapi-s?style=for-the-badge&logo=openapiinitiative&logoColor=%2385EA2D&color=black)
![Static Badge](https://img.shields.io/badge/openai-s?style=for-the-badge&logo=openai&logoColor=white&color=%23412991)

## API Documentation (BELUM)

We use Swagger UI as the API documentation, running on Docker with JSON configuration located on an external server.

Pull a pre-built docker image of the swagger-ui directly from Docker Hub:
  ```
  docker pull swaggerapi/swagger-ui
  ```
Provide a URL to a swagger.json on an external host:
  ```
  docker run -p 80:8080 -e SWAGGER_JSON_URL=https://recything.apicode.my.id/swagger/apidoc.json swaggerapi/swagger-ui
  ```
Running on cloud run : 
  - Pull swaggerapi/swagger-ui,
    ```
    docker pull swaggerapi/swagger-ui
    docker tag swaggerapi/swagger-ui gcr.io/$PROJECT_ID/swagger-ui  #change $PROJECT_ID to your project
    ```
  - Push to container registry
    ```
    docker push gcr.io/$PROJECT_ID/swagger-ui #change $PROJECT_ID to your project
    ```
  - Deploy cloud run
    ```
    gcloud run deploy swagger-ui \
    --image=gcr.io/$PROJECT_ID/swagger-ui:latest \                                         #change $PROJECT_ID to your project
    --platform=managed \
    --allow-unauthenticated \
    --set-env-vars=SWAGGER_JSON_URL=https://recything.apicode.my.id/swagger/apidoc.json    #change to your external json
    ```
## Unit Testing (BELUM)



## Running Project (BELUM)

Start project with Go :
```
go run main.go
```
## How to deploy to Cloud Run (BELUM)
  - First, build your Docker image and push it to the registry, just like you did with the Swagger UI configuration.
  - Deploy cloud run
    ```
    gcloud run deploy <Service-Name> \                            # e.g  gcloud run deploy recything
    --image=gcr.io/$PROJECT_ID/<Your-image>:latest \              #change $PROJECT_ID to your project
    --platform=managed \
    --allow-unauthenticated \
    --set-env-vars=MYSQL_PORT=3306                                #change to your env
    --set-env-vars=SERVER_PORT=  
    --set-env-vars=STORAGE=   
    ```

- Custom Domain

  Mapping domain with any DNS management , configuration mapping [here](https://console.cloud.google.com/run/domains). Click `Add Mapping`, And you can choose from 3 different ways of mapping domains, either using a custom domain with a load balancer, a custom domain with Cloud Run, or a custom domain with Firebase Hosting.

  ![Screenshot from 2023-12-18 11-06-44](https://github.com/RecyThing/RecyThing-API/assets/66883583/e8a32da4-0850-4ab1-87bf-d20e87dafda7)

  You will receive DNS records and add that configuration to the DNS Management in the platform where your domain is located


## CI/CD Platform (BELUM)
Cloud Build is a Google Cloud Platform CI/CD platform that is easily implemented with GitHub. Configure trigger [here](https://console.cloud.google.com/cloud-build/). We use cloudbuid.yaml for trigger CI/CD :

![Screenshot from 2023-12-18 10-50-19](https://github.com/RecyThing/RecyThing-API/assets/66883583/4635ccbe-7e4e-44b8-977b-b4e06bf5bba4)



## Team Back-End

| Name                           | University	                                         | 
| :----------------------------- | :--------------------------------------------------- | 
|	Al Hilaluddin                  | Universitas Muslim Indonesia                          |
|	Ardhian Wisnu Kartika                  | Universitas Telkom                       |	


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





