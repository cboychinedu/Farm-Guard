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
} from "react-native";
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons'; // Importing Expo vector icons
import styles from "@/styles/register/registerStyles";

// Creating the register page 
const RegisterPage = () => {
    // Creating the router object 
    const router = useRouter();

    // Setting some necessary states 
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // State to toggle password visibility
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Creating a function for handling the register 
    const handleRegister = () => {
        console.log("Register");
    }

    // Rendering the component 
    return (
        <SafeAreaView style={styles.container}>
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
                        {/* Added alignItems: 'center' to center the image horizontally */}
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={require("@/assets/images/farmGuardLogo.jpeg")}
                                style={styles.imageLogo}
                            />
                        </View>

                        {/* Adding the text  */}
                        <View style={styles.headerTextDiv}>
                            <Text style={styles.headerText}> Farm Guard </Text>
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
                {/* Wrapped in a row to allow the icon and input to sit side-by-side inside the border */}
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }]}>
                    <Feather name="user" size={20} color="gray" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={setFullName}
                        style={{ flex: 1, height: '100%' }} // Flex 1 makes it take up the rest of the space
                    />
                </View>

                {/* Adding the email div */}
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }]}>
                    <Feather name="mail" size={20} color="gray" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        style={{ flex: 1, height: '100%' }}
                    />
                </View>

                {/* Adding the password div */}
                <View style={[styles.input, { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }]}>
                    <Feather name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                    <TextInput
                        placeholder="Enter Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible} // Toggles based on state
                        style={{ flex: 1, height: '100%' }}
                    />
                    {/* Eye Icon Button to toggle visibility */}
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
        </SafeAreaView>
    );
}

// Exporting the component 
export default RegisterPage;