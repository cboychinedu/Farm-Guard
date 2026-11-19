# Importing the necessary modules 
from transformers import pipeline 
from PIL import Image 
import io
import os 

# Setting the path to the model directory 
modelPath = os.path.sep.join(["machineLearning", "models"])
modelPath = os.path.sep.join([modelPath, "local_tinyclip_model"])

# Creating the class for plant classification
class PlantClassification:
    def __init__(self):
        self.classifier = pipeline(
            task="zero-shot-image-classification", 
            model=modelPath,
            local_files_only=True 
            
        )
        
        # 1. Use natural language sentences
        # 2. Replace "non-plant" with concrete alternative categories
        self.labels = [
            "a clear photo of a plant, tree, or flower", 
            "a photo of a person or face", 
            "a photo of an animal or pet", 
            "a photo of a vehicle or car", 
            "a photo of a building, room, or architecture",
            "a photo of an everyday object, furniture, or gadget",
            "a blank image or abstract texture"
        ]
        
        # We only care if the plant label wins
        self.plantLabel = self.labels[0]

    def isPlantImage(self, raw_bytes: bytes): 
        pilImage = Image.open(io.BytesIO(raw_bytes)).convert("RGB")

        # The model will distribute confidence scores across all 7 labels
        results = self.classifier(pilImage, candidate_labels=self.labels)

        topResult = results[0]
        
        # If the highest scoring category is our plant description, it is a plant
        isPlant = topResult["label"] == self.plantLabel 

        return {
            "isPlant": isPlant,
            "topGuess": topResult["label"], 
            "confidence": round(topResult["score"], 4)
        }