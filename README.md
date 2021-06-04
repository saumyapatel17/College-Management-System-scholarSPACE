# College Management System

College Management system is a platform where a whole college can work together. In this application students, teacher as well as the admin of the same college can work together with their respective works. ScholarSPACE is a custom built college management system to meet the specific academic requirement of the colleges. All the required modules and features have been particularly built to just fit in our requirement. The sound database of the application makes it more user friendly and expandable. The package is highly customisable and can be modified as per the needs and requirements of the clients. It covers all the required modules right from separate Admin, Student and teacher portal, to event management, projects submission and grading and announcements system. 

---
## Key Features

- #### Student, Teacher database management
- #### Event management
- #### Customized groups
- #### Project submission and grades
- #### Personal workspace
- #### To-do lists and event calendar and announcements
- #### Support and Backup
- #### Customization

---
## Technology

This platform works on:
- #### Html, Javascript and CSS as frontend 
- #### Express.js as backend 
- #### NodeJs as JS run time environment 
- #### Handlebar as view engine 
- #### MySql for database


---
## Before runnnig

Go to sys.env and fill the details for database, user, pass and host accordingly.
From Database folder, download the sql files from schema 'dbms_project' in your system under same name. 

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

### Other dependencies
Install following dependencies, to run the project n your system:
- #### bcryptjs
- #### dotenv
- #### express
- #### hbs
- #### mail
- #### multer
- #### mysql
- #### nodemailer
- #### nodemon
- #### path

---

## Install

    $ git clone https://github.com/saumyapatel17/College-Management-System-scholarSPACE
    $ cd College-Management-System-scholarSPACE
    $ yarn install

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build