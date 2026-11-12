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
    ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from "@/styles/dashboard/dashboardStyles";
import AlertBoxStyles from '@/styles/alertBox/alertBoxStyles';

// Creating the dashboard screen component 
const Dashboard = () => {
    // Rendering the component 
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                {/* Adding the touchable without feedback tag */}
                <TouchableOpacity onPress={Keyboard.dismiss}> 
                    {/* Added Scroll View so the content can scroll when the keyboard is open */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    > 
                        {/* Adding the main div */}
                        <View> 
                            <Text> Main Section </Text>
                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

// Exporting the dashboard 
export default Dashboard; 