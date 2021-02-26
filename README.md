# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (frontend) is a collaborative learning platform.

## System Requirements

- [NodeJS v12 or higher](https://nodejs.org/en/)
- [Quasar CLI](https://quasar.dev/quasar-cli/installation)

## Installation Steps

1. Get folder from github 
  `git clone`
  - https://github.com/iqbalbaharum/fekreno

2. Install all dependencies 
  `npm ci`

3. Create a file name `.env` file in root folder
    - Copy and paste into `.env` file
    MAIN_BE_URL=http://localhost:3000/
    MAIN_BE_TOKEN=jwt

4. Starts the app in development mode
  `quasar dev`
