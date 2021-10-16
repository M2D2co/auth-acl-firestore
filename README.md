# AuthAclFirestore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Setup

1. Setup a new Firebase project
2. Enable Authentication and the Google sign-in provider
3. Login to the console and create a new app
4. Copy the configuration for the app into /src/firebase.config.json
5. Go to the Service Accounts page of the Firebase project and "Generate new private key"
6. Copy the file into the /functions/ folder of this project
7. Run `firebase use <project>` on the command line

## Run Locally

Update the _app.module.ts_ file, uncommenting the `_EMULATOR` lines.

In a terminal, run:

```
$ npm start
```

In a separate terminal, run:

```
$ cd functions
$ GOOGLE_APPLICATION_CREDENTIALS="{private-key-file}.json" npm run serve
```
