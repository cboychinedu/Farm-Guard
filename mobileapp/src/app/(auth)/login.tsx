// Importing the necessary modules 
import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Image,
    ImageBackground,
    Pressable,
    TextInput,
    Platform,
    ScrollView,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    ActivityIndicator,
} from "react-native";
import {
    useFonts,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import styles from "@/styles/login/loginStyles";
import * as SecureStore from 'expo-secure-store';
import CustomAlert from "@/components/alertBox/alertBox";

// Setting the alert interace 
interface alertConfigInterface {
    visible: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onConfirm?: () => void;
}

// Creating the login page 
const LoginPage = () => {
    // Creating the router object 
    const router = useRouter();

    // Setting the alert state 
    const [alertConfig, setAlertConfig] = useState<alertConfigInterface>({
        visible: false,
        type: "error",
        title: "",
        message: "",
    });

    // Setting some necessary states 
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    // Loading the fonts 
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    // Set the state to toggle the password visibility 
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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

    // Creating a function to handle the login 
    const handleLogin = async () => {
        // Checking the email field 
        if (!email.trim()) {
            // if the email field is empty, show the error message 
            showAlert("error", "Email required", "Please enter your email address");
            return;
        }

        // Checking if the email contains the @ symbol 
        else if (!email.includes("@")) {
            // if the email address does not include the @ symbol 
            showAlert("error", "Email incomplete", "Please enter a valid email address");
            return;
        }

        // Checking the password 
        else if (!password.trim()) {
            // if the password field is empty, show the error message 
            showAlert("error", "Password required", "Please enter your password");
            return;
        }

        // Else if all the fields was filled execute the block of code below 
        else {
            // Set loading as true 
            setLoading(true);

            // Building the login data 
            const loginData = JSON.stringify({
                email: email.trim(),
                password: password.trim()
            });

            // Getting the server api url 
            const serverUrl: string = `${process.env.EXPO_PUBLIC_SERVER_URL}/login`;

            // Using try catch block to send the login data to the backend 
            try {
                // Sending the data using fetch request and a method of POST 
                // request to the backend server 
                const response = await fetch(serverUrl, {
                    method: "POST",
                    body: loginData,
                    headers: { "Content-Type": "application/json" }
                });

                // Converting the response body into a json object 
                const responseBody = await response.json();

                // If the result status is success, execute the block of code below 
                if (responseBody.status === "success") {
                    // Save the token in the user's application 
                    await SecureStore.setItemAsync("farmGuardToken", responseBody.token); 

                    // Redirect the user to the dashboard page 
                    router.replace("/(private)/dashboard/dashboard" as any); 
                }

                // Else if the response body status was not a success message,
                // Execute the block of code below 
                else {
                    // Show the alert message 
                    showAlert("error", "Login failed", responseBody.message);
                    return;
                }
            }

            // Catch the error 
            catch (error: any) {
                // Display the error message 
                showAlert("error", "Network error", "Unable to connect to the server. Please try again.");

            }

            // Finally remove the loading bar 
            finally {
                // Remove the loader 
                setLoading(false);
            }
        }
    }

    // Wait for the fonts to load before rendering the UI 
    if (!fontsLoaded) {
        return null;
    }

    // Rendering the jsx component 
    return (
        <SafeAreaView style={styles.container}>
            {/* Wrapping the entire scren in Keyboard Avoiding View  */}
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Added Scroll View so the content can scroll when the keyboard is open */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Adding the background image */}
                        <ImageBackground
                            source={require("@/assets/images/farmGuardBg.jpg")}
                            style={styles.imageBackground}
                            imageStyle={styles.imageStyle}
                        >
                            {/* Adding the main div */}
                            <View style={styles.contentContainer}>
                                <View>
                                    {/* Adding the iamge section */}
                                    <View style={styles.imageSectionDiv} >
                                        <Image source={require("@/assets/images/farmGuardLogo.jpeg")}
                                            style={styles.imageLogo}
                                        />
                                    </View>

                                    {/* Adding the text */}
                                    <View style={styles.headerTextDiv}>
                                        <Text style={styles.headerText}> Farm Guard </Text>
                                    </View>
                                    <View style={styles.messageDisplayDiv}>
                                        <Text style={styles.messageDisplayDiv}> Welcome to FarmGuard Login Page. </Text>
                                        <Text style={styles.messageDisplayDiv}> identify and manage Plants health issues. </Text>
                                        <Text style={styles.messageDisplayDiv}> (Confidence in every scan ) </Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>

                        {/* Adding the login div */}
                        <View style={styles.registerContainer}>
                            {/* Adding the email div  */}
                            <View style={styles.input}>
                                <Feather name="mail" size={20} color="gray" style={styles.emailLogo} />
                                <TextInput
                                    placeholder="Enter your email address..."
                                    placeholderTextColor="#000000"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.emailTextInput}
                                />
                            </View>

                            {/* Adding the password div */}
                            <View style={styles.input}>
                                <Feather name="lock" size={20} color="gray" style={styles.passwordLogo} />
                                <TextInput
                                    placeholder="Enter your password..."
                                    placeholderTextColor="#000000"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible}
                                    style={styles.passwordTextInput}
                                />
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <Feather name={isPasswordVisible ? "eye" : "eye-off"} size={20} color="gray" />
                                </TouchableOpacity>
                            </View>

                            {/* Adding the Login button div */}
                            <View>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.button,
                                        { opacity: pressed ? 0.7 : 1 }
                                    ]}
                                    onPress={handleLogin}
                                >
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.buttonText}> SIGN IN </Text>
                                    )}
                                </Pressable>
                            </View>

                            {/* Adding the already signup text */}
                            <View style={styles.dontHaveAnAccountDiv}>
                                <View>
                                    <Text style={styles.dontHaveAnAccountText}> Don't have an account? </Text>
                                </View>
                                <View style={{ marginLeft: -4 }}>
                                    <Pressable onPress={() => router.replace("/(auth)/register" as any)}>
                                        <Text style={styles.signUpText}> Sign up </Text>
                                    </Pressable>
                                </View>
                            </View>

                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

// Exporting the login page 
export default LoginPage; 
