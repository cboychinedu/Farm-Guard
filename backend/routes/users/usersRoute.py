#!/usr/bin/env python3 

# Importing the necessary modules 
from fastapi import APIRouter 
from .home.homeRoute import homeRouter
from .login.loginRoute import loginRouter
from .register.registerRoute import registerRouter

# Creating the API router 
usersRouter = APIRouter() 

# Including the user's route 
usersRouter.include_router(homeRouter, tags=["Home Page"])
usersRouter.include_router(loginRouter, prefix="/login", tags=["Login Route"])
usersRouter.include_router(registerRouter, prefix="/register", tags=["Register Route"])