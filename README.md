# Selficient React dashboard

This is a web based Dashboard for interacting with the Selficient back end.

_This project uses __TypeScript__ and __SASS__ for logic and styling._

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You need:
* [NodeJS and NPM](https://nodejs.org/) to install the dependencies for this project
* [The Python backend](https://github.com/WyTho/python_flask) running on `http://127.0.0.1:5000` (can be changed in `webpack.config.js` if necessary)

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

# Code structure
```markdown
├── src
│   ├── components (3)
│   ├── containers (4)
│   ├── store (5)
│   │   ├── actions (5a)
│   │   ├── reducers (5b)
│   │   ├── actionTypes.tsx (5c)
│   │   ├── initialize.tsx (5d)
│   │   ├── middlewares.tsx (5e)
│   │   └── utilities.tsx (5f)
│   ├── styles (6)
│   ├── utils (7)
│   │   ├── dashboard (7a)
│   │   ├── data (7b)
│   │   ├── date (7c)
│   │   └── popup (7d)
│   ├── App.tsx (2)
│   └── index.tsx (1)
└── webpack.config.js
```

1. `index.tsx` is the entry point of the application (actually `webpack.config.js` is the entry point, but webpack will use `index.tsx` to bundle all files)

2. `App.tsx` is the root component (and is being inserted into the DOM in `index.tsx`)

3. The `components` folder contains (mostly) functional components to be used in `containers`.

4. `containers` are the 'pages' of the application, they use functional components and have other components inside specific to that page.

5. The [Redux](https://redux.js.org/) store ([Usage with react tutorial](https://redux.js.org/basics/usagewithreact))
    * a. In the `actions` folder are all possible actions for the reducers defined.
    * b. In the `reducers` folder you can find the logic behind all of the actions. In these reducers the state gets changed afer an action has been called.
    * c. `actionTypes.tsx` is an enum with all possible actions to dispatch to the Redux-store.
    * d. `initiallize.tsx` will initialize the state of Redux, this should only be called once (in `index.tsx`).
    * e. `middlewares.tsx` is a place to put middleware for intercepting actions before being dispatched to the reducers (like a logger for example).
    * f. `utilities.tsx` holds useful functions that are used in a lot of the reducers.
6. The `styles` folder contains all styling for the pages as well as the functional components. For styling the [The 7-1 Architectural Pattern](https://sass-guidelin.es/#the-7-1-pattern) for SASS has been used.
7. Utility functions
    * a. In the `dashboard` folder, there are some utility functions for the `Overview` page (the dashboard). These functions include: building chart labels & values, creating annotations, getting the current value etc.
    * b. In the `data` folder, there are utility functions for handling the different kinds of data send from [the Python backend](https://github.com/WyTho/python_flask).
    * c. In the `date` folder, there are many utility functions for handling Date values.
    * d. In the `popup` folder, there are utility functions for getting the name of an icon (for example) to be used in the pop-up window.

## Authors

* **Wesley Veenendaal** - *Initial work* - [Github page](https://github.com/eclipticrick)

See also the list of [contributors](https://github.com/wytho/React/contributors) who participated in this project.

## License

###### TODO: Add a LICENCE.md file if necessary
