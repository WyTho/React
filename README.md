# Selficient React dashboard

This is a web based Dashboard for interacting with the Selficient back end.

_This project uses __TypeScript__ and __SASS__ for logic and styling._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need:
* [NodeJS and NPM](https://nodejs.org/) to install the dependencies for this project
* [The Python Backend](https://github.com/WyTho/python_flask) running on `http://127.0.0.1:5000` (can be changed in `webpack.config.js` is necessary)

### Installing

A step by step series of examples that tell you how to get a development env running

Clone the repo.
```
git clone https://github.com/WyTho/React.git selficient-react-dashboard
```

Install the dependencies in the newly created folder
```
cd selficient-react-dashboard
npm install
```

Run the development server locally
```
npm run start
```
Navigate to [localhost:8080](http://localhost:8080) and take a look around.

Alternatively you can go to [localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) to see the app running there, along with any log statements.

*Note: if port 8080 is in use, the server will start at port 8081*

## Running the tests

Run the tests for this react dashboard
```
npm run test
```

Keep running the tests on every file-change (for development)
```
npm run test:watch
```

## Generate a test-coverage rapport

To generate a test coverage rapport run the following command.
```
npm run test:coverage
```
This command will add a folder named `/_coverage` in the root of this project. 

If you're running this project on a Windows device, you can run the following command to open the coverage rapport in your default browser.
```
npm run show:coverage
```
Alternatively you can open the coverage rapport manually by opening `/_coverage/lcov-report/index.html`.

## Generate documentation from the typescript code

To automatically generate documentation for this project, run the following command.
```
npm run docs:generate
```
This command will add a folder named `/_documentation` in the root of this project. 

If you're running this project on a Windows device, you can run the following command to open the generated documentation in your default browser.
```
npm run show:docs
```
Alternatively you can open the generated documentation manually by opening `/_documentation/index.html`.

## Deployment

To build this app for deployment run the following command.
```
npm run build
```
This command will compile the project files to `/dist` so this can be deployed on a web-server.

## Authors

* **Wesley Veenendaal** - *Initial work* - [Github page](https://github.com/eclipticrick)

See also the list of [contributors](https://github.com/wytho/React/contributors) who participated in this project.

## License

###### TODO: Add a LICENCE.md file if necessary
