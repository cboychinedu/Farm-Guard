# Importing the necessary modules 
import cv2 
import numpy as np 

# Convert the image into numpy byte array 
def convertImageToByte(imagePath: bytes): 
    # Read the stream into a numpy byte array 
    fileBytes = np.frombuffer(imagePath, np.uint8)
    image = cv2.imdecode(fileBytes, cv2.IMREAD_COLOR)
    
    # Returning the image 
    return image; 