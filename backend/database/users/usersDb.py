#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import json 

# Creating a class for handling the database operations 
class HandleUsersDatabase():
    # Creating a method for saving the user's information 
    def saveUsersInformation(self, collectionName, usersData): 
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Saving the users data 
        result = collection.insert_one(usersData)
        
        # Returning the result 
        return result.acknowledged 
    
    
    # Creating a method for getting the users information 
    def getUsersInformation(self, collectionName, email): 
        # Setting the query 
        query = {"email": email}
        
        # Getting the collection name 
        collection = self.db[collectionName]
        
        # Get the user data 
        userData = collection.find_one(
            query, 
            projection={
                "_id": 1,
                "fullname": 1, 
                "password": 1, 
            }
        )
        
        # If the returned data type is None type, execute the block of code below 
        if userData is None: 
            # Return None 
            return None
        
        # Convert the data into a json object 
        userData = json.dumps(dict(userData), default=str)
        
        # Return the json object userdata 
        return userData; 