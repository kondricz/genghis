# CRUD back-end exmaple

This is an open example of a restful API. One of the most common use case for node JS.

## Getting Started

The codebase exposes classical CRUD endpoints and uses an inmemory mongoDB database for persistent data.

### Prerequisites

NPM and node installed. Clone and run npm install in the root folder. First time it may take a while because of the inmemory mongo package is pretty big.

```
git clone https://github.com/kondricz/genghis.git
cd genghis
npm install
```

## Build with TS

First level of protection for code quality is the repository is typed. Run `npm run build` for the compiled JS version.

## Running the tests

Currently there are acceptance tests provided in the `src/__tests__/acceptance` folder. Run `npm run test` to run them. First run may take a bit more time.

### Running in dev

There is no optimization for production environment, only in dev. You will find all the related API calls with examples if You import the postman collection from the root folder.

```
npm run dev
```

## Built With

* [NodeJS](https://nodejs.org/en/) - Javascript on the server
* [ExpressJS](https://expressjs.com/) - Minimalistic node JS framework for easy backends
* [Typescript](https://www.typescriptlang.org/) - Javascript supercharged
* [MongoDB](https://www.mongodb.com/) - Simple noSQL database
* [Jest](https://jestjs.io/) - For acceptance tests

## Authors

* **Koppany Kondricz** - *Initial work* - [Koppany Kondricz](https://github.com/kondricz)