#!/usr/bin/env python3 

# Imporing the necessary modules 
import os 
import jwt 
import json 
from typing import Annotated
from database.connect import db 
from fastapi import APIRouter, File, UploadFile, Form, Depends
from middlewares.users.tokenVerification import verifyJwtToken
from machineLearning.convertStreamToImage import convertImageToByte

# Creating an instance of the API router for the login route 
dashboardRouter = APIRouter(); 

# Creating the home page for the dashboard router 
@dashboardRouter.post("/")
async def dashboardPage(plantImage: Annotated[UploadFile, File(...)], payload: dict = Depends(verifyJwtToken)):
    # print(payload); 
    imageBytes = await plantImage.read();  
    result = convertImageToByte(imageBytes); 
    print(result);  
    
    return { "success": "Welcome to the dashboard page", "data": payload }