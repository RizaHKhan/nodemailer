﻿# nodemailer

A few points to for future reference:

dotenv syntax: 
EMAIL=kh

Required as follows:

const dotenv = require('dotenv')
dotenv.config()

If the .env is in the same folder level as the file calling it. Use the path dependency to have it look in a different directory. 

Trying to illustrate the bigger picture below on how this all works.

Objective: Collecting information from vistors to the website. 
The form points towards the person who created the application (me). It sends the entered information (name, contact info and message) to the creator. 

This information can be transferred to a database for storage as well as sent as an email to the creator. 

Furthermore, emails can be sent to all users that have entered their information in the database. 

This is not product ready, and validation has not been added in the above case.

The method used in this case is from Nodemailer JS (https://nodemailer.com/about/). There are some code adjustments that we made, but overall it is the same as the information relayed on the landing page. 
