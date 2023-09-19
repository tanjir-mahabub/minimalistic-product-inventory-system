# Product inventory app

Goal of the assignment is to create a minimalistic product inventory system.
This repository contains a stub of the application with the same tech stack
that our real application is built with:

* [Docker](https://www.docker.com/)
* [Postgres SQL database](https://www.postgresql.org/)
* [Hasura GraphQL server](https://hasura.io/)
* [Typescript](https://www.typescriptlang.org/)
* [React](https://react.dev/)
* [Apollo GraphQL client](https://www.apollographql.com/docs/react/)
* [Ant Design UI library](https://ant.design/)

## Tasks

Please complete all of the following:

1. List available products, their stock and prices
2. Calculate total value of all products in the inventory
3. Create a form to add new product to inventory

## Run the application

```sh
# install dependencies
npm i

# start frontend server
npm start

# start postgres & hasura
docker compose up
```


Then open http://localhost:3000/ in your browser.

Hasura serves a grapql endpoint with schema auto generated from Postgres schema. It is available at http://localhost:8080/v1/graphql. Frontend should interact with the database only through this endpoint.

Hasura console is available at http://localhost:8080/console.

To add migrations for new database tables, you would have to run Hasura console locally using [Hasura CLI](https://hasura.io/docs/latest/hasura-cli/overview/).

# Deploy

### Hasura Deployment
To deploy to the Hasura Cloud need a free account with Hasura Cloud and also need to generate database connection string to connect with the database. 


```
hasura deploy --endpoint "<endpoint>" --admin-secret "<admin-secret>"
```

Set database string as value of environment variables "PG_DATABASE_URL"
```
PG_DATABASE_URL: postgres://postgresusername:postgrespassword@postgres:5432/postgres
```

### Environment Setup
Rename the .env.example file to .env
Set your .env variables:

REACT_APP_GRAPHQL_URI='Your_graphql_uri' 

REACT_APP_SECRET_KEY='x-hasura-admin-secret'

### Netlify Deployment
For deploying React app need to use Netlify-CLi

```
npm run build 
# or 
yarn build
```
If you haven't logged in to your Netlify account through the CLI, you can do so by running:

```
netlify login
cd build
```
Run the following command to initialize a new Netlify site for your project:
```
netlify init
```
Follow the prompts to configure your site settings. You can choose to link your project to an existing site or create a new one.

#### Deploy Your Site:
After initializing your project, you can deploy it to Netlify with the following command:

```
netlify deploy
```


## Deployment URL:
[Hasura Console](https://cloud.hasura.io/project/c144efd4-a6ac-4b76-b685-2b51f02f138f/console)

[Product Inventory App](https://product-inventory-app.netlify.app/)