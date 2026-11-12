// Importing the necessary modules 
import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import COLORS from "@/styles/colors/colors";
import { Ionicons } from "@expo/vector-icons";
import LogoutButton from "@/components/logout/logout";

// Creating the users layout component 
const UsersLayout = () => {
    // Setting the menu visibility state 
    const [menuVisible, setMenuVisible] = useState(false);

    // Rendering the layout with the tabs and drawer modal 
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: COLORS.background,
                        paddingTop: 6,
                        paddingBottom: 10,
                        height: 70,
                    },
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: "white",
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarInactiveTintColor: "#667486",
                }}
            >
                {/* Adding the dashboard tab */}
                <Tabs.Screen
                    name="dashboard/dashboard"
                    options={{
                        title: "Dashboard",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={24}
                                name={focused ? "grid" : "grid-outline"}
                                color={color as any}
                            />
                        ),
                        headerRight: () => <LogoutButton />,
                        headerTitle: "Dashboard",
                    }}
                />

                <Tabs.Screen
                    name="history/history"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={24}
                                name={focused ? "person" : "person-outline"}
                                color={color as any}
                            />
                        ),
                        headerTitle: "Profile",
                    }}
                />

                {/* Settings Tab */}
                <Tabs.Screen
                    name="settings/settings"
                    options={{
                        title: "Settings",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={24}
                                name={focused ? "settings" : "settings-outline"}
                                color={color as any}
                            />
                        ),
                        headerTitle: "Settings",
                    }}
                />

                {/* Menu Tab Trigger */}
                <Tabs.Screen
                    name="menu"
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                            setMenuVisible(true);
                        },
                    }}
                    options={{
                        title: "Menu",
                        tabBarIcon: ({ focused, color }) => (
                            <Ionicons
                                size={24}
                                name={focused ? "menu" : "menu-outline"}
                                color={color as any}
                            />
                        ),
                    }}
                />

            </Tabs>


            {/* Resuable Drawer Modal */}
        </>
    )
}

// Exporting the UsersLayout layout 
export default UsersLayout; 