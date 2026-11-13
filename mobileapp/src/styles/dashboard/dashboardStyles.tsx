// Importing the necessary modules 
import {
    StyleSheet, 
    Dimensions 
} from 'react-native'; 

// Getting the width and height o the mobile device 
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window"); 

// Creating the style sheet 
const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#F1F8E9" // Light green theme background
    }, 
    keyboardAvoidingView: {
        flex: 1, 
        width: "100%", 
    },
    mainDiv: {
        padding: 20, 
    },
    quickDiagnoseDiv: {
        backgroundColor: "#2E7D32", // Dark green theme
        height: 300, 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 20,
        borderRadius: 15, // Increased slightly for a smoother UI
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    }, 
    quickDiagnoseImage: {
        width: "100%",
        height: "100%",
        borderRadius: 15,
    },
    quickDiagnoseText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        letterSpacing: 1.5,
    },
    pressableButtonDiv: {
        marginTop: -35, // Moved up to overlap with the bottom right of the image screen
        height: 60, 
        justifyContent: "flex-end", 
        alignItems: "flex-end",
        paddingRight: 10,
        zIndex: 10, // Ensures it sits above the image view
    }, 
    addImageButton: {
        backgroundColor: "#4CAF50", // Vibrant green theme
        height: 80, 
        width: 80, 
        borderRadius: 40,
        justifyContent: "center", 
        alignItems: "center",
        borderWidth: 4,
        borderColor: "#F1F8E9", // Matches background to give a cutout effect
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }, 
    addImageButtonText: {
        color: "white", 
        fontSize: 36, 
        fontWeight: "bold",
        marginBottom: 4, // Centers the plus sign perfectly visually
    },
    analyzeButtonContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    analyzeButton: {
        backgroundColor: "#1B5E20", // Deep forest green to stand out as primary action
        width: '100%',
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    analyzeButtonDisabled: {
        backgroundColor: "#A5D6A7", // Washed out green when loading to indicate disabled state
        elevation: 0,
    },
    analyzeButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 0.5,
    },
    recentDiagnosesDiv: {
        marginTop: 25,
        paddingBottom: 20,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1B5E20", // Deep green
        marginBottom: 15,
    },
    historyCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        borderLeftWidth: 6,
        borderLeftColor: "#4CAF50", // Green indicator bar
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    historyDate: {
        fontSize: 12,
        color: "#7CB342", // Muted green for date
        marginBottom: 6,
        fontWeight: "600",
    },
    historyResult: {
        fontSize: 16,
        color: "#333",
        fontWeight: "500",
    }
}); 

// Exporting the styles 
export default styles;