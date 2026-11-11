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
    ScrollView 
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

// Creating the register page 
const RegisterPage = () => {
    // Creating the router object 
    const router = useRouter();

    // Setting some necessary states 
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Load the fonts
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    // State to toggle password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Creating a function for handling the register 
    const handleRegister = () => {
        console.log("Register");
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
                                    <Text style={styles.buttonText}> CREATE ACCOUNT </Text>
                                </Pressable>
                            </View>

                            {/* Adding the already signup text */}
                            <View style={styles.alreadyHaveAnAccountDiv}>
                                <View> 
                                    <Text style={styles.alreadyHaveAnAccountText}> Already have an account? </Text>
                                </View>
                                <View style={{ marginLeft: -4 }}>
                                    <Pressable onPress={() => router.push("/(auth)/login" as any)}>
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