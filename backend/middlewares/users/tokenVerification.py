#!/usr/bin/env python3 

# Importing the necessary modules 
import os 
import jwt
from fastapi import Depends, HTTPException, status 
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

# Secret key 
secretKey = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"; 

# Creating the http bearer object 
security = HTTPBearer() 

# Creating a function to verify the jwt token 
def verifyJwtToken(credentials: HTTPAuthorizationCredentials = Depends(security)): 
    # Getting the token 
    token = credentials.credentials
    
    # 
    try: 
        payload = jwt.decode(token, secretKey, algorithms=[ALGORITHM])
        return payload 
    
    # 
    except jwt.ExpiredSignatureError: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail={
                "message": "Token has expired", 
                "status": "error", 
                "statusCode": 401    
            }, 
            headers={"WWW-Authenticate": "Bearer"}
        )
        
    # 
    except jwt.PyJWTError: 
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail={
                "message": "Invalid authentication credentials",
                "status": "error",
                "statusCode": 401 
            },
            headers={"WWW-Authenticate": "Bearer"}
        )