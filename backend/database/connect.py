#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
from pymongo import MongoClient
from .users.usersDb import HandleUsersDatabase

# Creating a class for handling the database conections 
class MongoDB(HandleUsersDatabase): 
    # Initializing the class 
    def __init__(self):
        # Creating a variable for the clinet and db 
        uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
        dbName = os.getenv("MONGODB_DB_NAME", "FarmGuard")
        
        # Using try catch block to connect to the database 
        try: 
            # Getting the user's database name, and uri 
            self.client = MongoClient(uri) 
            self.db = self.client[dbName]
            
        # Catch the error and log it to the console 
        except Exception as error: 
            # Display the error in connection to the database 
            print(f"[ERROR]: Error connecting to the database! {str(error)}")
            
            # Set the client, and db as None 
            self.client = None 
            self.db = None 
            
# Creating a shared instance of the MongoDb class 
db = MongoDB(); 
