# POC

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.2.

## Development server
Install node.js
Run `npm install`
Create .env file in project root and with variables 
  `JWT_SECRET=` value of secret from backend
  `CLOUDANT_URL=` the Cloudant db url from bluemix
  `PORT=3000` Current angular proxy expects the frontend server on port 3000
Run `npm start` for a dev server. `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

~~Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.~~

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build
Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
~~Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.~~

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
