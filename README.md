# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (backend) is a collaborative learning platform.

## Documentation

- [System requirements](#system-requirements)
- [Installation](#installation Steps)
- [Configuration File](#configuration-file)
  - [Database](#database)
  - [Storage](#file-storage)
  - [SMTP - Simple Mail Transfer Protocol](#smtp)
- [Database Migration](#database-migration)
- [System Architecture]()
- [Troubleshooting](#)

## System Requirements

- [NodeJS v12 or higher](https://nodejs.org/en/)
- [MySQL](https://dev.mysql.com/downloads/)
- Code IDE - preferably [Visual Studio](https://code.visualstudio.com/), [Vim](https://www.vim.org/)
- [IBM Loopbackframework - Version Loopback 4](https://loopback.io/doc/en/lb4/Concepts.html)
- [AWS Cloud S3](https://aws.amazon.com/)
- [SMTP Access](https://developers.google.com/gmail/imap/imap-smtp)

## Installation Steps

1. Get folder from github 
  `git clone`
  - https://github.com/iqbalbaharum/bekreno
  - https://github.com/iqbalbaharum/fekreno
2. Install all dependencies 
  `npm ci`

[Back to top](#documentation)

## Configuration File

1. Create a file name `.env` file in root folder
2. Copy the syntax from `.env-example` to `.env` and enter the information as below:

| Key                     | Description                                             | Example value                 |
| ----------------------- | ------------------------------------------------------- | ----------------------------- |
| NODE_ENV                | General code environment                                | `production` or `development` |
| TOKEN_SECRET            | JWT hasing salt                                         | `mylocal`                     |
| TOKEN_VALIDITY          | JWT Expiration in milliseconds                          | `21600`                       |
| MYSQL_HOST              | Path to MYSQL instance                                  | `localhost`                   |
| MYSQL_DB                | Name of the DB                                          | `obkreno`                     |
| MYSQL_USERNAME          | username                                                | `root`                        |
| MYSQL_PASSWORD          | password                                                | ` `                           |
| SMTP_HOST               | Handle outgoing email [SMTP](#smtp)                     | `any@email.com`               |
| SMTP_SECURE             | Handle outgoing email [SMTP](#smtp)                     | `true` @ `false`              |
| SMTP_PORT               | Handle outgoing email [SMTP](#smtp)                     | `465`                         |
| SMTP_USERNAME           | Handle outgoing email [SMTP](#smtp)                     | ` `                           |
| SMTP_PASSWORD           | Handle outgoing email [SMTP](#smtp)                     | ` `                           |
| OTP_ENABLE              | Enable OTP (one-time-password) login                    | `0` or `1`                    |
| SMS_URL                 | If OTP_ENABLE=1, SMS provider detail (optional)         |                               |
| SMS_API                 | If OTP_ENABLE=1, SMS Api Key (optional)                 |                               |
| SMS_TAG                 | If OTP_ENABLE=1, SMS Tag (optional)                     |                               |
| OTP_SECRET              | If OTP_ENABLE=1, OTP code generation secret (optional)  |                               |
| OTP_VALIDITY            | Define how long the token will be valid in milliseconds |                               |
| ONESIGNAL_APPID         | Optional, [OneSignal](https://onesignal.com/)           |                               |
| ONESIGNAL_APPKEY        | Optional, [OneSignal](https://onesignal.com/)           |                               |
| STORAGE_PROVIDER        | Optional, [Storage](#storage)                           | `aws`                         |
| STORAGE_PROVIDER_KEY_ID | Optional, [Storage](#storage)                           |                               |
| STORAGE_PROVIDER_KEY    | Optional, [Storage](#storage)                           |                               |
| STORAGE CONTAINER       | Optional, [Storage](#storage)                           |                               |

## Database

1. Create new database in MySQL
Database: MySQL

The model is built with SQL-query in mind. To change it, u need to update the datasource.

[Back to top](#documentation)

## Database Migration

Database migration is a process to migrate models to database tables or collections.
When a migration is finished, the dataset in the source databases resides in target databases.

Auto-migration helps the user create relational database schemas based on definitions of their models together with their relation.

**Reference**
https://loopback.io/doc/en/lb4/Database-migrations.html

**Create a new migration**

1. Create models
2. Create repository
3. Add model in `migrate.ts`

**Run migration**

1. `npm run build`
2. `npm run migrate`

[Back to top](#documentation)

## File Storage

To reduce system complexity, the framework use cloud-based storage.

**Reference**
[Loopback-storage-components](https://loopback.io/doc/en/lb3/Storage-component.html)

#### Using Cloud provider (AWS)

1. Go to [file.datasource.ts](), and **change** code for `const config` to below

```js
const config = {
  name: 'File',
  connector: 'loopback-component-storage',
  provider: 'aws',
  key: <AWS_KEY>,
  keyId: <AWS_KEY_PROVIDER>,
  nameConflict: 'makeUnique',
  makeUnique: true,
};
```

To get AWS_KEY you'll will need to register and go to [AWS Console](https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html)

#### Using Filesystem

To change to to local storage follow step belows:

1. In root, create a new folder named `storage`
2. Change directory inside `./storage` and create another folder name similar as **STORAGE CONTAINER**
3. Go to [file.datasource.ts](), and **change** code for `const config` to below

```js
const config = {
  name: 'File',
  connector: 'loopback-component-storage',
  provider: 'filesystem',
  root: './storage',
};
```

4. Run application
  `npm start`

[Back to top](#documentation)
