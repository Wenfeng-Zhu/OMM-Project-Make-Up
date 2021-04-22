# OMM-Project-Make-Up
[![node.js version](https://img.shields.io/badge/node.js-v6.14.8-green)](https://nodejs.org/en/)
[![react version](https://img.shields.io/badge/react-v17.0.2-blue)](https://reactjs.org/)
[![material-ui version](https://img.shields.io/badge/material--ui-v4.11-blue)](https://www.npmjs.com/package/@material-ui/core)

Personal Make-Up Project of Online Multimedia

This is a Meme-generator website. The front-end of the website uses [React](https://reactjs.org/) as the development framework, [Node.js-Express](https://expressjs.com/) as the back-end server, and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2-de?utm_source=google&utm_campaign=gs_emea_germany_search_core_brand_atlas_desktop&utm_term=mongodb%20atlas&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624524&gclid=Cj0KCQiA-OeBBhDiARIsADyBcE5Cuu9rodsrPe2UB2ddOsDB_JG_OdV-ZE8LMog316zN1W_VFpSY8MwaAlK2EALw_wcB) as the database support.

## Installation
This project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/). Go check them out if you don't have them locally installed.  
You will need to go into this folder  
 ```sh
cd meme-generator 
```
 Then you will need to install the necessary packages.  
 ```sh
npm install
```
A custom command is added to this application to start the front-end and back-end servers at the same time  
```sh
npm run dev
```
Then open the http://localhost:3000/ to use the web page of the project or open the http://localhost:5000/ to open the back-end server to test the api of web.

## Authentication
Since this project uses the MongoDB Atlas database, the code contains the identity authentication of the database, which may become invalid in the future. You can change the database URI in the **api.js file** under the **server folder** and use your own database. But be sure to use MongDB, because the data model in this application is all built on MongoDB.

For the administrator account of this application, it is:

username: WenfengZhu

password: omm2021

When you use your own database, you need to manually create an admin collection and add the corresponding administrator account, the format is:

{ username: "the name you like", password: "your password" }

After you add your administrator account, then you should go the the admin page http://localhost:3000/admin to add some your own images to your database.
If you add the images successfully, you can find your own images in **server/public/upload folder** and you will have a link document of the image in your local database.
