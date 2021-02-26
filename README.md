**# Krenovator LMS System (Open Source)**



**### Introduction**



Krenovator LMS (frontend) is a collaborative learning platform using Quasar Framework and VueJS



**## System Requirements**



  - VueJS 
  - Code IDE - preferably Visual Studio
  - Quasar Framework



**## Installation**



1. Create project folder in desired location.

2. Clone the repository into the folder using git bash. 

    \- Run `git clone` in the bash terminal following by the url of the project

​      \> fekreno : https://github.com/iqbalbaharum/fekreno.git



3. Once completed, run the terminal in IDE and run command `npm ci` for fresh installation of the project. 

    \- Make sure to install in right folder. Use command `cd` to change directory of folder 
   

4. Install Quasar Framework by running command `npm install -g @quasar/cli`



**## Configuration File**



1. Create a file name `.env` file in root folder.  This file links the frontend to the backend

   

   MAIN_BE_URL=http://localhost:3000

   MAIN_BE_TOKEN=jwt

   

**#### Run Application**

1. Run command `quasar dev`

