// Importing the necessary modules 
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Animated,
    Keyboard,
    PanResponder,
    Dimensions,
    LayoutChangeEvent,
    Pressable,
    Image,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import styles from "@/styles/dashboard/dashboardStyles";
// import AlertBoxStyles from '@/styles/alertBox/alertBoxStyles';

// Creating the dashboard screen component 
const Dashboard = () => {
    // Setting some necessary states 
    const [plantImage, setPlantImage] = useState<string | null>(null); 
    
    // State to hold the analysis history
    const [analysisHistory, setAnalysisHistory] = useState([
        { id: '1', date: 'Oct 24, 2023', diagnosis: 'Healthy Ficus, no issues detected' },
        { id: '2', date: 'Oct 15, 2023', diagnosis: 'Mild Nitrogen deficiency' }
    ]);

    // State for the backend analysis loading status
    const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

    // Use the built-in permission hooks
    const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
    const [cameraPermissionResponse, requestCameraPermission] = ImagePicker.useCameraPermissions();

    // Creating a function for uploading the plant image 
    const uploadPlantImage = async () => {
        // Show an alert to choose between Camera and Gallery
        Alert.alert(
            "Select Image Source",
            "Choose where to pick the plant image from",
            [
                {
                    text: "Take Photo",
                    onPress: async () => {
                        // Check and request camera permission
                        if (!cameraPermissionResponse?.granted) {
                            const cameraPermission = await requestCameraPermission();
                            if (!cameraPermission.granted) {
                                Alert.alert("Permission denied", "Permission to access camera is required");
                                return;
                            }
                        }

                        // Launch camera
                        const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
                            allowsEditing: true, 
                            aspect: [1, 1], 
                            quality: 0.8,
                        });

                        // if the selected image was successful, execute the block of code below 
                        if (!result.canceled) {
                            // Save the image inside the image state 
                            setPlantImage(result.assets[0].uri); 
                        }
                    }
                },
                {
                    text: "Choose from Gallery",
                    onPress: async () => {
                        // Check and request permission 
                        if (!permissionResponse?.granted) {
                            // Get the permission 
                            const permission = await requestPermission(); 

                            // If the permission was not granted 
                            if (!permission.granted) {
                                // Display an error message 
                                Alert.alert("Permission denied", "Permission to access gallery is required"); 
                                return; 
                            }
                        }

                        // Launch the image picker using uploaded Media Type option 
                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images, 
                            allowsEditing: true, 
                            aspect: [1, 1], 
                            quality: 0.8,
                        }); 

                        // if the selected image was successful, execute the block of code below 
                        if (!result.canceled) {
                            // Save the image inside the image state 
                            setPlantImage(result.assets[0].uri); 
                        }
                    }
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ]
        );
    }

    // Creating a function to send the image to the backend for analysis
    const analyzePlant = async () => {
        // Ensure there is an image to analyze
        if (!plantImage) {
            Alert.alert("Missing Image", "Please capture or select an image of a plant first.");
            return;
        }

        // Set loading state to true
        setIsAnalyzing(true);

        try {
            // Setting up form data to send the image to the backend
            const formData = new FormData();
            formData.append('image', {
                uri: plantImage,
                name: 'plant_image.jpg',
                type: 'image/jpeg',
            } as any);

            // Replace 'YOUR_BACKEND_URL_HERE' with your actual API endpoint
            /*
            const response = await fetch('YOUR_BACKEND_URL_HERE/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to analyze image");
            
            const data = await response.json();
            */

            // Simulating a network request delay for demonstration
            await new Promise(resolve => setTimeout(resolve, 2500));
            const mockResult = "Analysis complete: Plant appears healthy with optimal hydration.";

            // Creating the new analysis object to store in history
            const newAnalysis = {
                id: Math.random().toString(),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                diagnosis: mockResult // Replace mockResult with data.diagnosis when API is connected
            };

            // Updating the analysis history state
            setAnalysisHistory(prevHistory => [newAnalysis, ...prevHistory]);
            
            // Show success message
            Alert.alert("Analysis Complete", "Your plant data has been updated.");
            
        } catch (error) {
            console.error("Error analyzing plant:", error);
            Alert.alert("Analysis Failed", "Could not process the image. Please try again.");
        } finally {
            // Set loading state back to false
            setIsAnalyzing(false);
        }
    }

    // Rendering the component 
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                {/* Adding the touchable without feedback tag */}
                <TouchableOpacity onPress={Keyboard.dismiss} activeOpacity={1}> 
                    {/* Added Scroll View so the content can scroll when the keyboard is open */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    > 
                        {/* Adding the main div */}
                        <View style={styles.mainDiv}> 
                            {/* Adding the quick diagonse div  */}
                            <View style={styles.quickDiagnoseDiv}> 
                                {plantImage ? (
                                    <Image source={{ uri: plantImage}} style={styles.quickDiagnoseImage} /> 
                                ):(
                                    <Text style={styles.quickDiagnoseText}> QUICK DIAGNOSE </Text>
                                )}
                            </View>

                            {/* Adding the diagnose button div */}
                            <View style={styles.pressableButtonDiv}> 
                                <Pressable onPress={uploadPlantImage} style={({ pressed }) => [
                                        styles.addImageButton,
                                        { opacity: pressed ? 0.8 : 1 }
                                    ]}>
                                    <Text style={styles.addImageButtonText}> + </Text>
                                </Pressable>
                            </View>

                            {/* Adding the analyze plant button div (Only shows when image is selected) */}
                            {plantImage && (
                                <View style={styles.analyzeButtonContainer}>
                                    <TouchableOpacity 
                                        onPress={analyzePlant} 
                                        disabled={isAnalyzing}
                                        style={[
                                            styles.analyzeButton, 
                                            isAnalyzing && styles.analyzeButtonDisabled
                                        ]}
                                    >
                                        {isAnalyzing ? (
                                            <ActivityIndicator size="small" color="#ffffff" />
                                        ) : (
                                            <Text style={styles.analyzeButtonText}> Analyze Plant </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}

                            {/* Adding the recent diagnoses div */}
                            <View style={styles.recentDiagnosesDiv}> 
                                <Text style={styles.historyTitle}> Analysis History </Text>
                                {analysisHistory.map((item) => (
                                    <View key={item.id} style={styles.historyCard}> 
                                        <Text style={styles.historyDate}>{item.date}</Text>
                                        <Text style={styles.historyResult}>{item.diagnosis}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

// Exporting the dashboard 
export default Dashboard;