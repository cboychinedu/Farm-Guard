#!/usr/bin/env python3 

# Importing the necessary modules 
import bcrypt 
from datetime import datetime 
from database.connect import db
from fastapi import APIRouter, Request

# Creating an instance of the API router for the register route 
registerRouter = APIRouter()

# Creating the register route 
@registerRouter.post("/")
async def registerUser(request: Request): 
    # Using try except block to connect to the database, and check 
    # if the user is already registered on the database, if not 
    # Register the user. 
    try: 
        # Getting the user registration data 
        userData = await request.json() 
        
        # Getting the individual user's data 
        fullname = userData.get("fullname")
        email = userData.get("email") 
        password = userData.get("password")
        
        # Checking the fullname 
        if fullname is None: 
            # Build the error message 
            errorMessage = {
                "message": "Fullname is required!", 
                "status": "error", 
                "statusCode": 301
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Checking the email 
        elif email is None: 
            # Building the error message 
            errorMessage = {
                "status": "error", 
                "message": "Email address is missing!", 
                "statusCode": 301
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Checking the password 
        elif password is None:
            # Building the error message  
            errorMessage = {
                "status": "error", 
                "message": "Password "
            }
            
            # Sending the error message 
            return errorMessage; 
        
        # Else if the request body is not empty, execute the block of
        # Code below
        else: 
            # Checking if the user is already registered on the database 
            databaseCheck = db.getUsersInformation(
                collectionName="users", 
                email=email
            )
            
            # If the database check is not None 
            if databaseCheck is not None: 
                # Building the error message 
                errorMessage = {
                    "message": "User already exist!", 
                    "status": "error", 
                    "statusCode": 401
                }
                
                # Sending the error message 
                return errorMessage;
            
            # If the result is None, which means the user with the specified email address 
            # is not registered on the database, perform the block of code below and encrypt 
            # the user password 
            password = bytes(password.encode("utf-8"))
            passwordHash = bcrypt.hashpw(password, bcrypt.gensalt(10))
            
            # Getting the date data 
            fullDate = datetime.now() 
            fullDate = fullDate.strftime("%Y-%m-%d %I:%M:%S %p")
            
            # Creating a payload to hold the user's data 
            registrationData = {
                "fullname": fullname, 
                "email": email, 
                "password": passwordHash, 
                "dateCreated": fullDate
            }
            
            # Saving the registration data 
            result = db.saveUsersInformation(
                collectionName="users", 
                usersData=registrationData
            )
            
            # If the data is saved on the database, execute the block 
            # of code below 
            if (result): 
                # Building the success message 
                successMessage = {
                    "message": "User registered on the database!", 
                    "status": "success", 
                    "statusCode": 200
                }
                
                # Sending back the success message 
                return successMessage; 
            
            # Else if the data is not saved on the database, execute 
            # the block of code below 
            else: 
                # Building the error message 
                errorMessage = {
                    "message": "User not saved on the database!", 
                    "status": "error", 
                    "statusCode": 404
                }
                
                # Sending the error message 
                return errorMessage; 
    
    # Unless exception as error 
    except Exception as error: 
        # Execute the block of code if there was an error connecting 
        # To the database, and display the error to the console 
        errorMessage = {
            "message": "Error connecting to the database!", 
            "status": "error", 
            "statusCode": 500
        }
        
        # Sending the error message 
        return errorMessage; 