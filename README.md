# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (backend) is a collaborative learning platform. Who is Krenovator ?

Before we go in deep, firstly you need to know basic programming language :

1. HTML
2. CSS
3. JavaScript

You can learn this on (https://www.freecodecamp.org) and also other free platfrom like (https://www.tutorialspoint.com/html/index.htm) or (https://www.w3schools.com)

# Before we jump to the next step, for beginner please follow this video and do !

-https://www.youtube.com/watch?v=GV-D85D9KJQ&feature=emb_logo


## Documentation

- [System requirements](#system-requirements)
- [Installation](#installation)
- [Configuration File](#configuration-file)
- [Troubleshooting](#)

## System Requirements

- [NodeJS v12 or higher](https://nodejs.org/en/)
- Code IDE - preferably [Visual Studio](https://code.visualstudio.com/), [Vim](https://www.vim.org/)
- [Github for desktop](https://docs.github.com/en/desktop/installing-and-configuring-github-desktop/installing-github-desktop)

## Installation

### Use Github for desktop for easy way to learn as a beginner.

1. `Open github website ,git clone choose "open with github for desktop"`
2. `On github for desktop press "open in visual studio code" `
3. `On the terminal write command "npm ci"`
4. [On terminal install Quasar "click n follow step here"](https://quasar.dev/quasar-cli/installation) 

 ## Do you why we need to write npm ci at the first place??? clink learn npm ci.
 - [Learn npm ci  ](https://docs.npmjs.com/cli/v7/commands/npm-ci)

## Core framework using on this project is

- Vue.js 
 - [Let's get to know Vuejs ](https://vuejs.org/v2/guide/)

Vuejs create package.jason,
from this file you can look at the dependency that this project are use :

Example:
"@quasar/extras": "^1.0.0",

    "@vuex-orm/core": "^0.36.3",
    "@vuex-orm/plugin-search": "^0.24.1",
    "axios": "^0.18.1",
    "core-js": "^3.6.5",
    "qs": "^6.9.4",
    "quasar": "^1.0.0",
    "vue": "^2.6.12",
    "vuelidate": "^0.7.5",
    "vuex": "^3.5.1"

Learn more at (https://www.sitepoint.com/vue-js-quasar-framework/)

## UI framework using on this project  is

- Quasar
 - [Why this  project use quasar? ](https://quasar.dev/introduction-to-quasar)

Once you done installing quasar cli you will get this folder:

1. Src
2. Public
3. .quasar

## In Src have 13 folder :

## There only 7 folder are from quasar  cli at this project Src folder:

1. Asset
2. boot
3. Components
4. css
5. layouts
6. pages
7. router

inlude App.vue

 ###  We can see that, by default, quasar includes components like QLayout, QPage, which pertain to CSS layout.
 ### Quasar has created router/routes.js file with an index route, specifying layout and page for the root path:

 Learn more at (https://www.sitepoint.com/vue-js-quasar-framework/) and (https://quasar.dev).

# Others folder are basicly are not provided by quasar cli:

1. database
2. datasource
3. models
4. repositories
5. service
6. store

## Let's learn about quasar.conf.js 

 Quasar created a file quasar.conf.js in the root folder, which holds all of our configuration settings.

 Here have  we can add or remove dependencies.
 Here is important for you to know what are plugin are being use in this project.

