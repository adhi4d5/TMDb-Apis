# TypeScript REST Node Starter

This repository can be used as a convenient starting point for building
`NODE REST API`'s using `TypeScript` on top of `Express` web framework.  

# Features
 - Repository pattern used to enable separation of concerns
 - `MongoDB` - default repository implementation, should be easy to replace
 
# Pre-reqs
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Clone the repository
```
Github-url: https://github.com/adhi4d5/TMDb-Apis
```
- Install dependencies

- using npm i

- will download all the dependencies 

cd <project_name>
npm install
```
- Configure your mongoDB server
```
mongod
```
- To run the project
```
npm start
```


-To Build the project
 ```
 npm run build

```

# Base Url : http://localhost:3000/

# REST endpoints
- public: `topEpisodes/:id`, `analytics/popularSeries`;

- example-Api-1 :  http://localhost:3000/topEpisodes/124

- example-Api-2 :  http://localhost:3000/analytics/popularSeries

# Import mock users

```
Mock data confirgured for testing.
```

# Tests
- npm run test

* Before running tests be sure to create a real `.env` file  or No problem Automaticcaly         confirgured parameters if missing .env file.
```
```
