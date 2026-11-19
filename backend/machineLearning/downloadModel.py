from transformers import pipeline

# Run this ONCE while online
print("Downloading model...")
classifier = pipeline(
    task="zero-shot-image-classification", 
    model="wkcn/TinyCLIP-ViT-8M-16-Text-3M-YFCC15M"
)

# Save it to a local folder
classifier.save_pretrained("./models/local_tinyclip_model")
print("Model saved locally!")