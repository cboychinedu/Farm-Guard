// Importing the necessary modules 
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import COLORS from "@/styles/colors/colors";
import styles from "@/styles/users/userDrawerStyles";
import { usersMenu } from "@/constants/users/usersTabs"; 

// Getting the screen width and defining the drawer width 
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const DRAWER_WIDTH = SCREEN_WIDTH * 0.95;
const PRIMARY_COLOR = COLORS?.primary || "#139541";

// Defining the interface for the users drawer modal props 
interface UserDrawerModalProps {
    visible: boolean;
    onClose: () => void;
}

// Creating the user modal component 
const UserDrawerModal: React.FC<UserDrawerModalProps> = ({
    visible,
    onClose,
}) => {
    // Using the router for navigation 
    const router = useRouter();

    // Animate the slide view 
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

    // Using useEffect to animate the drawer when visibility changes
    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    // Creating a function to handle navigation when a menu item is pressed 
    const handleNavigate = (route: string) => {
        // Close the menu screen 
        onClose();

        // Navigate the user to the specified route 
        router.push(route as any);
    };

    // Rendering the modal screen with animated drawer and menu items 
    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Pressable style={styles.backdrop} onPress={onClose} />

                <Animated.View
                    style={[
                        styles.drawerContainer,
                        { transform: [{ translateX: slideAnim }] },
                    ]}
                >
                    <SafeAreaView style={styles.drawerInner}>
                        {/* Drawer Header */}
                        <View style={styles.drawerHeader}>
                            <Text style={styles.drawerTitle}> Menu </Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                                <Ionicons name="close" size={26} color="white" />
                            </TouchableOpacity>
                        </View>

                        {/* Menu Buttons */}
                        <View style={styles.drawerBody}>
                            {usersMenu.map((item) => (
                                <TouchableOpacity
                                    key={item.route}
                                    style={styles.menuRow}
                                    activeOpacity={0.7}
                                    onPress={() => handleNavigate(item.route)}
                                >
                                    <View style={styles.menuLeft}>
                                        <View style={styles.iconWrapper}>
                                            <Ionicons
                                                name={item.icon}
                                                size={20}
                                                color={item.color || PRIMARY_COLOR}
                                            />
                                        </View>
                                        <Text style={styles.menuText}> {item.title} </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color="#A0A0A0" />
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Drawer Footer */}
                        <View style={styles.drawerFooter}>
                            <View style={styles.menuLeft}>
                                {/* <View style={styles.iconWrapper}>
                                    <FontAwesome5 name="shuttle-van" size={20} color={COLORS.primary} />
                                </View> */}
                                <Text style={styles.logoText}>Farm Guard </Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </Animated.View>
            </View>

        </Modal>
    )
}

// Exporting the drawer modal 
export default UserDrawerModal; 