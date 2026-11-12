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
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
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
import styles from "@/styles/register/registerStyles";
import CustomAlert from "@/components/alertBox/alertBox";

// Setting the alert interface 
interface alertConfigInterface {
    visible: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onConfirm?: () => void;
}

// Creating the register page 
const RegisterPage = () => {
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
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState(false);

    // Load the fonts
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    // State to toggle password visibility
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

    // Creating a function for handling the register 
    const handleRegister = async () => {
        // Checking the fullname 
        if (!fullName) {
            // If the fullname is empty, show the error message 
            showAlert("error", "Full name is required", "Please enter your fullname");
            return;
        }

        // Checking the email field 
        else if (!email.trim()) {
            // if the email field is empty, show the error message 
            showAlert("error", "Email required", "Please enter your email address");
            return;
        }

        // Checking that the email contains the @ symbol 
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
            // Set is loading as true 
            setLoading(true);  

            // Building the register data 
            const registerData = JSON.stringify({
                fullname: fullName.trim(), 
                email: email.trim(), 
                password: password.trim()
            })

            // Getting the server api url 
            const serverUrl: string = `${process.env.EXPO_PUBLIC_SERVER_URL}/register`;

            // Using try catch block to send the registration data to the backend 
            try {
                // Sending the data using fetch request and a method of POST 
                // request to the backend server 
                const response = await fetch(serverUrl, {
                    method: "POST", 
                    body: registerData, 
                    headers: { "Content-Type": "application/json"}
                }); 

                // Converting the response body into a json object 
                const responseBody = await response.json(); 

                // If the result status is success, execute the block of code below 
                if (responseBody.status === "success") {
                    // show the dialog box 
                    showAlert("success", 
                        "Registration successful", 
                        responseBody.message, 
                        () => router.replace("/(auth)/login" as any)
                    )
                }

                // Else if the response body status was not a success message, execute the 
                // block of code below 
                else {
                    // Show the alert message 
                    showAlert("error", 
                        "Registration failed", 
                        responseBody.message || "Please try again"
                    )
                }
            }

            // Catch the error on bad server request, 
            // execute the block of code below 
            catch (error: any) {
                // Display the error message 
                showAlert("error", "Network error", "Unable to connect to the server. Please try again."); 
            }

            // Finally stop the loading 
            finally {
                // Stop the loading bar 
                setLoading(false); 
            }
        }
    }

    // IMPORTANT: Wait for fonts to load before rendering the UI
    if (!fontsLoaded) {
        return null;
    }

    // Rendering the component 
    return (
        <SafeAreaView style={styles.container}>
            {/* Wrapping the entire screen in KeyboardAvoidingView */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1, width: '100%' }}
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

                {/* Touchable without feedback */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Added ScrollView so content can scroll when keyboard is open */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Adding the background image  */}
                        <ImageBackground
                            source={require("@/assets/images/farmGuardBg.jpg")}
                            style={styles.imageBackground}
                            imageStyle={{ opacity: 0.4 }}
                            blurRadius={10}
                        >
                            {/* Adding the main div */}
                            <View style={styles.contentConainer}>
                                <View>
                                    {/* Adding the image section */}
                                    <View style={{ alignItems: 'center' }}>
                                        <Image
                                            source={require("@/assets/images/farmGuardLogo.jpeg")}
                                            style={styles.imageLogo}
                                        />
                                    </View>

                                    {/* Adding the text  */}
                                    <View style={styles.headerTextDiv}>
                                        <Text style={[styles.headerText, { fontFamily: 'Poppins_700Bold' }]}> Farm Guard </Text>
                                    </View>
                                    <View style={styles.messageDisplayDiv}>
                                        <Text style={styles.messageDisplayDiv}> Welcome to FarmGuard. </Text>
                                        <Text style={styles.messageDisplayDiv}> identify and manage Plants health issues. </Text>
                                        <Text style={styles.messageDisplayDiv}> (Confidence in every scan ) </Text>
                                    </View>
                                </View>
                            </View>
                        </ImageBackground>

                        {/* Adding the login div */}
                        <View style={styles.registerContainer}>

                            {/* Adding the full name div */}
                            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }]}>
                                <Feather name="user" size={20} color="gray" style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder="Full Name"
                                    value={fullName}
                                    placeholderTextColor="#000000"
                                    onChangeText={setFullName}
                                    style={{ flex: 1, height: '100%', fontFamily: "Poppins_400Regular" }}
                                />
                            </View>

                            {/* Adding the email div */}
                            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }]}>
                                <Feather name="mail" size={20} color="gray" style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder="Email Address"
                                    placeholderTextColor="#000000"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={{ flex: 1, height: '100%', fontFamily: "Poppins_400Regular" }}
                                />
                            </View>

                            {/* Adding the password div */}
                            <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }]}>
                                <Feather name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder="Enter Password"
                                    placeholderTextColor="#000000"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!isPasswordVisible}
                                    style={{ flex: 1, height: '100%', fontFamily: "Poppins_400Regular" }}
                                />
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <Feather
                                        name={isPasswordVisible ? "eye" : "eye-off"}
                                        size={20}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Adding the Register button div */}
                            <View>
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.button,
                                        { opacity: pressed ? 0.7 : 1 }
                                    ]}
                                    onPress={handleRegister}
                                >
                                    {loading ? (
                                        <ActivityIndicator size="small" color="#FFFFFF" />
                                    ) : (
                                        <Text style={styles.buttonText}> CREATE ACCOUNT </Text>
                                    )}
                                </Pressable>
                            </View>

                            {/* Adding the already signup text */}
                            <View style={styles.alreadyHaveAnAccountDiv}>
                                <View>
                                    <Text style={styles.alreadyHaveAnAccountText}> Already have an account? </Text>
                                </View>
                                <View style={{ marginLeft: -4 }}>
                                    <Pressable onPress={() => router.replace("/(auth)/login" as any)}>
                                        <Text style={styles.signInText}> Sign In </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Exporting the register page 
export default RegisterPage;