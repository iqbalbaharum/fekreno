# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (backend) is a collaborative learning platform.

## Getting Started & Installation
1. Open terminal and go to fekreno folder
   Command: cd fekreno

2. Create .env file and put these in the file:
   MAIN_BE_URL=http://localhost:3000/
   MAIN_BE_TOKEN=jwt

3. Install frontend dependency:
   Command: npm ci

3. Install quasar cli to ensure you can use quasar command:
   Command: npm install -g @quasar/cli
   
4. To run the frontend: quasar dev