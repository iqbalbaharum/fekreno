# Krenovator LMS System (Open Source)

### Introduction

Krenovator LMS (backend) is a collaborative learning platform.

Updated readMe version by Farhana
##Cloning repository into local folder.

1. To clone fekreno in local folder, run this command on your terminal :

		              ````````````````````````````````````````````````
                    cd [folder_name] - set directory folder
                    
                    git clone [copied repository url from git hub]
		              ````````````````````````````````````````````````
                  
2. The file that you cloned should be in the local folder.

##Setting up configuration file

1. Create a file named .env in root folder.
2. Copy the following configuration and paste into the file :
                    
                    MAIN_BE_URL=http://localhost:3000
                    MAIN_BE_TOKEN=jwt

##Installing Quasar

1. If you havent install any quasar yet, open your terminal and run the command : 

                     `````````````````````````````````
                      sudo npm install -g @quasar/cli
	                   `````````````````````````````````

2. Make sure during installation, you get the right version of Quasar.
3. To run frontend run this command on your terminal :

	                  ``````````````
                      quasar dev
	                  ``````````````

