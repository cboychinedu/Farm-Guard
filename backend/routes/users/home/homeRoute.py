#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt 
import json 
import argon2 
import datetime 
from fastapi import APIRouter, Request 

# Creating an instance of the API router 
homeRouter = APIRouter() 

# Creating the home page 
@homeRouter.get("/")
async def HomePage(request: Request): 
    # Returing the home page 
    return {
        "status": "success", 
        "message": "welcome to farm guard backend!", 
        "statusCode": 200
    } 