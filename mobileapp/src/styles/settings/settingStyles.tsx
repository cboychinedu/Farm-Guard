// Importing the necessary modules 
import { StyleSheet, Dimensions } from 'react-native';

// Getting the width and height of the mobile device 
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Creating the style sheet 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F8E9" // Light green theme background (matching dashboard)
    },
    keyboardAvoidingView: {
        flex: 1,
        width: "100%",
    },
    mainDiv: {
        padding: 20,
    },
    headerDiv: {
        marginTop: 10,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1B5E20", // Deep forest green
        letterSpacing: 0.5,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#7CB342", // Muted green
        marginTop: 5,
    },
    sectionContainer: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2E7D32", // Dark green theme
        marginBottom: 10,
        marginLeft: 5,
    },
    settingCard: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    settingLeftContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E8F5E9", // Very light green for icon background
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    settingTextContent: {
        justifyContent: "center",
    },
    settingTitle: {
        fontSize: 16,
        color: "#333",
        fontWeight: "600",
    },
    settingDescription: {
        fontSize: 12,
        color: "#757575",
        marginTop: 2,
    },
    logoutButtonContainer: {
        marginTop: 10,
        marginBottom: 40,
        width: '100%',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: "#FFF", 
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: "#E53935", // Red for destructive action
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    logoutButtonText: {
        color: "#E53935",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.5,
    }
});

// Exporting the styles 
export default styles;