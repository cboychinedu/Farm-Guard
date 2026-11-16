// Importing the necessary modules 
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Switch
} from 'react-native';
import React, { useState } from 'react';
import * as SecureStore from "expo-secure-store";
import { Ionicons } from '@expo/vector-icons';
import styles from "@/styles/settings/settingStyles";
import CustomAlert from '@/components/alertBox/alertBox';

// Setting the alert interface 
interface alertConfigInterface {
    visible: boolean;
    type: "success" | "error";
    title: string;
    message: string;
    onConfirm?: () => void;
}

// Creating the settings screen component 
const Settings = () => {
    // Setting the alert state 
    const [alertConfig, setAlertConfig] = useState<alertConfigInterface>({
        visible: false,
        type: "error",
        title: "",
        message: "",
    });

    // Setting toggle states for preferences
    const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
    const [autoAnalysisEnabled, setAutoAnalysisEnabled] = useState<boolean>(false);

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

    // Creating a function to handle user logout
    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out of your account?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Log Out",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Remove the token from secure store
                            await SecureStore.deleteItemAsync("farmGuardToken");
                            
                            // Show success message (or navigate to login)
                            showAlert("success", "Logged Out", "You have been successfully logged out.");
                            
                            // TODO: Add navigation to Login screen here
                            // router.replace("/login");
                        } catch (error) {
                            console.log("Error logging out:", error);
                            showAlert("error", "Logout Failed", "An error occurred while logging out.");
                        }
                    }
                }
            ]
        );
    };

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
                    {/* Added Scroll View so the content can scroll */}
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Adding the main div */}
                        <View style={styles.mainDiv}>
                            
                            {/* Header Section */}
                            <View style={styles.headerDiv}>
                                <Text style={styles.headerTitle}>Settings</Text>
                                <Text style={styles.headerSubtitle}>Manage your preferences and account</Text>
                            </View>

                            {/* Account Settings Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Account</Text>
                                
                                <TouchableOpacity style={styles.settingCard} activeOpacity={0.7}>
                                    <View style={styles.settingLeftContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="person-outline" size={20} color="#2E7D32" />
                                        </View>
                                        <View style={styles.settingTextContent}>
                                            <Text style={styles.settingTitle}>Edit Profile</Text>
                                            <Text style={styles.settingDescription}>Update your personal details</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.settingCard} activeOpacity={0.7}>
                                    <View style={styles.settingLeftContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="lock-closed-outline" size={20} color="#2E7D32" />
                                        </View>
                                        <View style={styles.settingTextContent}>
                                            <Text style={styles.settingTitle}>Change Password</Text>
                                            <Text style={styles.settingDescription}>Secure your account</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
                                </TouchableOpacity>
                            </View>

                            {/* App Preferences Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Preferences</Text>
                                
                                {/* Notifications Toggle */}
                                <View style={styles.settingCard}>
                                    <View style={styles.settingLeftContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="notifications-outline" size={20} color="#2E7D32" />
                                        </View>
                                        <View style={styles.settingTextContent}>
                                            <Text style={styles.settingTitle}>Push Notifications</Text>
                                            <Text style={styles.settingDescription}>Receive alerts for plant analysis</Text>
                                        </View>
                                    </View>
                                    <Switch
                                        trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
                                        thumbColor={notificationsEnabled ? "#4CAF50" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
                                        value={notificationsEnabled}
                                    />
                                </View>

                                {/* Auto Analysis Toggle */}
                                <View style={styles.settingCard}>
                                    <View style={styles.settingLeftContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="leaf-outline" size={20} color="#2E7D32" />
                                        </View>
                                        <View style={styles.settingTextContent}>
                                            <Text style={styles.settingTitle}>Auto-Save Analysis</Text>
                                            <Text style={styles.settingDescription}>Automatically save to history</Text>
                                        </View>
                                    </View>
                                    <Switch
                                        trackColor={{ false: "#E0E0E0", true: "#A5D6A7" }}
                                        thumbColor={autoAnalysisEnabled ? "#4CAF50" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={() => setAutoAnalysisEnabled(!autoAnalysisEnabled)}
                                        value={autoAnalysisEnabled}
                                    />
                                </View>
                            </View>

                            {/* Support Section */}
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionTitle}>Support & About</Text>
                                
                                <TouchableOpacity style={styles.settingCard} activeOpacity={0.7}>
                                    <View style={styles.settingLeftContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="help-circle-outline" size={20} color="#2E7D32" />
                                        </View>
                                        <View style={styles.settingTextContent}>
                                            <Text style={styles.settingTitle}>Help Center</Text>
                                            <Text style={styles.settingDescription}>FAQ and contact support</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.settingCard} activeOpacity={0.7}>
                                    <View style={styles.settingLeftContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons name="document-text-outline" size={20} color="#2E7D32" />
                                        </View>
                                        <View style={styles.settingTextContent}>
                                            <Text style={styles.settingTitle}>Terms & Privacy</Text>
                                            <Text style={styles.settingDescription}>Read our policies</Text>
                                        </View>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="#BDBDBD" />
                                </TouchableOpacity>
                            </View>

                            {/* Logout Button */}
                            <View style={styles.logoutButtonContainer}>
                                <TouchableOpacity
                                    onPress={handleLogout}
                                    style={styles.logoutButton}
                                >
                                    <Text style={styles.logoutButtonText}>Log Out</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ScrollView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

// Exporting the settings page 
export default Settings;