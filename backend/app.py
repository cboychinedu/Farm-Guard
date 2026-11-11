#!/usr/bin/env python3 

# =================================================================
# Author: Engr. Mbonu Chinedum 
# Date Created: 2026-11-11 10:54 AM 
# Date Modified: 2026-11-11 10:54 AM
# Project Name: FarmGuard
# Location: Nigeria (Tinubu Administration)
# 
# LICENSE: Creative Commons Attribution-NonCommercial 4.0 (CC BY-NC)
# =================================================================
# This software is provided as Open Source for educational and 
# personal use. You are free to:
#   - SHARE: Copy and redistribute the material in any medium.
#   - ADAPT: Remix, transform, and build upon the material.
#
# UNDER THE FOLLOWING TERMS:
#   - ATTRIBUTION: You must give appropriate credit to the author.
#   - NON-COMMERCIAL: You may NOT use the material for commercial 
#     purposes. This software cannot be sold or used for profit.
# =================================================================

# Importing the necessary modules 
import uvicorn 
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from logs.logger import LoggingMiddleware
from dotenv import load_dotenv, find_dotenv 
from fastapi.middleware.cors import CORSMiddleware

# Loading the environment variables 
load_dotenv(find_dotenv(), verbose=True) 

# Importing the necessary routes 
from routes.users.usersRoute import usersRouter

# Creating an instance of the fast api class 
app = FastAPI(
    docs_url=None, 
    redoc_url=None, 
    openapi_url=None
)

# Defining the client origins 
origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000"
]

# Adding the cors configurations 
app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

# Adding the logger 
app.add_middleware(LoggingMiddleware)

# Including the routers 
app.include_router(usersRouter, tags=["Home Route"])

# Default 404 Exception Handler for unimplemented routes
@app.exception_handler(404)
async def custom_404_handler(request: Request, exc):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": f"The route '{request.url.path}' is not implemented on this server."
        }
    )

# Running the main application 
if __name__ == "__main__": 
    # Run the app in the root directory 
    uvicorn.run("app:app", host="0.0.0.0", port=3001, reload=True) 