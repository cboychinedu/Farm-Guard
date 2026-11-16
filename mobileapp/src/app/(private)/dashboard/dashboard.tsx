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
import {
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from "expo-secure-store";
import React, { useState, useEffect } from 'react';
import styles from "@/styles/dashboard/dashboardStyles";
import CustomAlert from '@/components/alertBox/alertBox';
import AlertBoxStyles from '@/styles/alertBox/alertBoxStyles';

// Setting the alert interface 
interface alertConfigInterface {
    visible: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onConfirm?: () => void;
}

// Creating the dashboard screen component 
const Dashboard = () => {
    // Setting the alert state 
    const [alertConfig, setAlertConfig] = useState<alertConfigInterface>({
        visible: false,
        type: "error",
        title: "",
        message: "",
    });

    // Creating a function to trigger/show the alert cleanly 
    const showAlert = (type: "success" | "error", title: string, message: string, onConfirm?: () => void) => {
        setAlertConfig({
            visible: true,
            type,
            title,
            message,
            onConfirm
        });
    };

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
        if (!plantImage) {
            Alert.alert("Missing Image", "Please capture or select an image of a plant first.");
            return;
        }

        setIsAnalyzing(true);

        try {
            // Append the Blob to the FormData (web-standard way)
            const formData = new FormData();

            // Extract the file metadata from the image uri 
            const filename = plantImage.split("/").pop() || "plantImage.jpg";
            const match = /\.(\w+)$/.exec(filename);
            const fileType = match ? `image/${match[1]}` : `image/jpeg`;

            // Appending the image into the form data  
            formData.append("plantImage", {
                uri: Platform.OS === "android" ? plantImage : plantImage.replace("file://", ""),
                name: filename,
                type: fileType,
            } as any);

            // Getting the server url and the token values 
            const serverUrl: string = `${process.env.EXPO_PUBLIC_SERVER_URL}/dashboard/`;
            const usersToken = await SecureStore.getItemAsync("farmGuardToken") as string;

            // Send the request, and get back the response 
            const response = await fetch(serverUrl, {
                method: "POST",
                body: formData,
                headers: {
                    // Do NOT set Content-Type here; the browser/fetch will auto-set it with the boundary
                    "Authorization": `Bearer ${usersToken}`
                }
            });

            // Getting the response from the server 
            const responseData = await response.json();
            console.log(responseData);

            if (responseData.status === "success") {
                // Show the alert 
                showAlert("success", "Analysis Passed", responseData.message); 
            }

            // Checking the response data 
            else {
                // Show the alert message 
                showAlert(
                    "error", 
                    "Analysis Failed",
                    responseData.message, 

                )

            }



            // if (responseData.detail && responseData.detail.status === "error") {
            //     Alert.alert("Error", responseData.detail.message);
            //     return;
            // }

            // console.log(responseData);
            // Alert.alert("Analysis Complete", "Your plant data has been updated.");

        } catch (error: any) {
            console.log("Error analyzing plant:", error.message);
            Alert.alert("Analysis Failed", "Could not process the image. Please try again.");
        } finally {
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

                {/* Custom Styled Alert Modal */}
                <CustomAlert
                    visible={alertConfig.visible}
                    type={alertConfig.type}
                    title={alertConfig.title}
                    message={alertConfig.message}
                    onClose={() => {
                        setAlertConfig((prev) => ({ ...prev, visible: false }));
                        if (alertConfig.onConfirm) {
                            alertConfig.onConfirm();
                        }
                    }}
                />

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
                                    <Image source={{ uri: plantImage }} style={styles.quickDiagnoseImage} />
                                ) : (
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