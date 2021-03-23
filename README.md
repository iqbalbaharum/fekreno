# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (frontend) is a collaborative learning platform.

## Documentation

- [System requirements](#system-requirements)
- [Installation](#installation)
- [Configuration File](#configuration-file)
- [Run Application](#run-application)

## System Requirements

- [VueJS](https://vuejs.org/)
- [Quasar Framework](https://quasar.dev/)

[Back to top](#documentation)

## Installation

1. `git clone` (Makes a copy of the Git repository to a newly created directory)
2. `cd fekreno` (Changes directory to the newly created folder)
3. `npm ci` (Installs dependencies directly from `package-lock.json`)

### Quasar CLI installation
Install Quasar framework by running:

```
$npm install -g @quasar/cli
```

[Back to top](#documentation)

## Configuration File

1. Create a file name `.env` file in root folder
2. Enter the information in the `.env` file as below:

```js
MAIN_BE_URL=http://localhost:3000

MAIN_BE_TOKEN=jwt
```

[Back to top](#documentation)

## Run Application
Run the following:
```
$quasar dev
```

[Back to top](#documentation)