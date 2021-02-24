# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (frontend) is a collaborative learning platform using Quasar Framework javascript flavor from VueJS



## FEkreno - Prerequisite

- Install Nodejs

- Install Quasar Framework

  ***npm install -g @quasar/cli***



## How to deploy FEkreno in local machine

1. Open Terminal/Command prompt & Git clone
2. Goto folder directory FEkreno
3. Type command: ***npm ci***
4. Once installation complete, then type this command ***quasar dev***



## To Connect BEkreno with FEkreno

1. Create .env file in root project folder

2. Add following details:

   MAIN_BE_URL=http://localhost:3000 (URL for BEkreno)

   MAIN_BE_TOKEN=jwt

3. Then run again command ***quasar dev*** 

