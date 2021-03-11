# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (backend) is a collaborative learning platform.

## Installation

1. `git clone (repository link)` - Clone a Git repository to your local machine
2. `cd` - Change the directory on terminal to the root folder directory
3. `npm ci` - Installs dependencies directly from `package-lock.json`
4. `npm install -g @quasar/cli` - Install quasar framework if you have not install it yet


## Configuration file

1. Create a file name `.env` in root folder
2. Paste the following information in `.env` folder:

```js
MAIN_BE_URL=http://localhost:3000
MAIN_BE_TOKEN=jwt
```

## Run the application

1. Run the following command on terminal:

```
quasar dev

```
