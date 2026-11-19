from transformers import pipeline 
from PIL import Image 
import io

class PlantClassification:
    def __init__(self):
        self.classifier = pipeline(
            task="zero-shot-image-classification", 
            model="wkcn/TinyCLIP-ViT-8M-16-Text-3M-YFCC15M", 
            
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
        self.plant_label = self.labels[0]

    def isPlantImage(self, raw_bytes: bytes): 
        pil_image = Image.open(io.BytesIO(raw_bytes)).convert("RGB")

        # The model will distribute confidence scores across all 7 labels
        results = self.classifier(pil_image, candidate_labels=self.labels)

        top_result = results[0]
        
        # If the highest scoring category is our plant description, it is a plant
        isPlant = top_result["label"] == self.plant_label 

        return {
            "isPlant": isPlant,
            "top_guess": top_result["label"],       # See exactly what the model thought it was
            "confidence": round(top_result["score"], 4)
        }