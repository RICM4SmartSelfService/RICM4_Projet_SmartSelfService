# RICM4_Projet_SmartSelfService
This repository contains a project made by students of Polytech Grenoble in the field _RICM (Network, Computer Science and Communication)_ in their 4th year.

#### This project aims to be a platform to control connected lockers.

For more informations go to the **[wiki of the project](http://air.imag.fr/index.php/Projets-2016-2017-SmartSelfService)**
Complementary information files are in the folder **doc**. Where simple setup instructions can be found on the flyer.

## Web application
The web application is a [Meteor](https://www.meteor.com/) Blaze project.

### Architecture
As any Meteor application, ours is mainly composed of two classic parts : the **Client** and the **Server**. The second one here only defines the access rights among the database. The Client includes a `main.js` file, linked to an html document which displays the generic application UI. The `helpers.js` file contains all the globals helpers accessible from any other classes. Finally, every file from the **router** folder is imported in the main. These files also import and create routes to go to all the UI templates defined in the imports folder.


![](https://i.imgur.com/n5GXwDK.png)

### Database
The database is a Mongo Database and is structured as pictured below.
![](https://i.imgur.com/f4qk0w6.png)


## Lockers
The code we put onto the ESP8266 chip used to control the lockers can be found in the folder **ESP8266**. It is a simple code based on the example code that can be found [here](https://github.com/marcoschwartz/aREST/tree/master/examples/ESP8266_cloud)
