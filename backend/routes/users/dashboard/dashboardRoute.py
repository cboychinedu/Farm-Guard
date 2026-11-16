#!/usr/bin/env python3 

# Importing the necessary modules
import os 
import jwt 
import json 
from typing import Annotated
from database.connect import db 
from fastapi import APIRouter, File, UploadFile, Form, Depends
from middlewares.users.tokenVerification import verifyJwtToken
from machineLearning.imageOperations import ImageOperations
from machineLearning.imageClassification import PlantClassification

# Creating an instnace of the image operations class 
imageOps = ImageOperations(); 

# Creating an instnace of the plant classification classs 
plantAnalysis = PlantClassification(); 

# Creating an instance of the API router for the login route 
dashboardRouter = APIRouter(); 

# Creating the home page for the dashboard router 
@dashboardRouter.post("/")
async def dashboardPage(
        plantImage: Annotated[UploadFile, File(...)], 
        payload: dict = Depends(verifyJwtToken)):
    # Reading the image into memory  
    imageBytes = await plantImage.read(); 

    # Converting the image into bytes  
    # imageBytes = imageOps.convertImageToByte(imageBytes); 

    # Displaying the image 
    result = plantAnalysis.isPlantImage(imageBytes) 

    # if the result is not a plant 
    if (result["isPlant"]): 
        # Build the error message 
        successMessage = {
            "status": "success", 
            "message": "The uploaded image is a plant", 
            "statusCode": 200
        }

        # Sending the error message 
        return successMessage; 

    # Perform the instance segmentation
    else: 
        # Success message 
        errorMessage = {
            "status": "error", 
            "message": "The uploaded image is not a plant", 
            "statusCode": 301
        }

        # Sending the error message 
        return errorMessage; 