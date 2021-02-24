# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (frontend) is a collaborative learning platform.

## Information
This repository is the frontend code for Krenovator LMS.
For the backend source code, you can go to this repository [Bekreno](https://github.com/iqbalbaharum/bekreno).
You will need both of the source code to run this system.

## Requirement
To run this project, you will need: 

 [**Node.js**](https://nodejs.org/en/) version `v10.18.1` or higher

> check node version on terminal, `node -v`
```js

$ node -v

v12.19.0 // current version on my machine
```

 [**npm**](https://www.npmjs.com/get-npm) version `6.13.4` or higher
> Note: when you download Node.js, you automatically get npm installed on your machine

> check npm version on terminal, `npm -v`
```js

$ npm -v

6.14.8 // current version on my machine
```

[**Quasar CLI**](https://quasar.dev/quasar-cli/installation) version `1.0.0` or higher


> check quasar-cli version on terminal, `quasar -v`
```js

$ quasar -v

1.1.2 // current version on my machine
```

## Installation
1. Clone this repository
```
$ git clone https://github.com/iqbalbaharum/fekreno.git
```

2. Install dependencies
```js
// run npm ci inside the project root folder
// eg: c:/projects/fekreno

$ npm ci
```

3. Create `.env` file inside root folder
```
// paste this inside your .env file

MAIN_BE_URL=http://localhost:3000/  // to connect with backend
MAIN_BE_TOKEN=jwt
```

4. Run the project
```js
$ quasar dev
```
You can see your project running on [http://localhost:8080/](http://localhost:8080/) by default
Goodluck!!

## Note
If you have any issues or suggestion for this project, do let us know!
If you want to contribute, please fork this project and submit a pull request.


