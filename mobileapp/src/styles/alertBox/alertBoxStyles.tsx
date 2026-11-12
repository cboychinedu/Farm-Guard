// Importing the necessary modules 
import { 
    StyleSheet, 
    Dimensions
} from 'react-native'; 

// Getting the phone width 
const { width } = Dimensions.get("window");

// Creating the alert box styles 
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    alertCard: {
        width: width * 0.82,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 24,
        alignItems: "center",
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    iconWrapper: {
        width: 72,
        height: 72,
        borderRadius: 36,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 8,
    },
    alertMessage: {
        fontSize: 14,
        color: "#4B5563",
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 20,
    },
    actionButton: {
        width: "100%",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

// Exporting the styles 
export default styles; 