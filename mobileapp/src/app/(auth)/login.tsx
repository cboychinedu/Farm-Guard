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
import { Feather } from '@expo/vector-icons';

// Creating the login page 
const LoginPage = () => {
    // Rendering the jsx component 
    return(
        <SafeAreaView> 
            <View> 
                <Text> Hello Login </Text>
            </View>
        </SafeAreaView>
    )
}

// Exporting the login page 
export default LoginPage; 
