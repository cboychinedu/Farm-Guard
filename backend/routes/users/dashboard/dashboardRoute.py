#!/usr/bin/env python3 

# Imporing the necessary modules 
import os 
import jwt 
import json 
from database.connect import db 
from fastapi import APIRouter, Form, Depends
from middlewares.users.tokenVerification import verifyJwtToken
from machineLearning.convertStreamToImage import convertImageToByte

# Creating an instance of the API router for the login route 
dashboardRouter = APIRouter(); 

# Creating the home page for the dashboard router 
@dashboardRouter.post("/", dependencies=[Depends(verifyJwtToken)])
async def dashboardPage(plantImage: str = Form(...), payload: dict = Depends(verifyJwtToken)):
    # print(payload); 
    result = convertImageToByte(plantImage); 
    print(result.shape);  
    
    return { "success": "Welcome to the dashboard page", "data": payload }