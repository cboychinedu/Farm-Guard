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
    filterScroll: {
        marginBottom: 20,
    },
    filterContentContainer: {
        paddingRight: 20,
    },
    filterChip: {
        backgroundColor: "#E8F5E9",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#C8E6C9",
    },
    filterChipActive: {
        backgroundColor: "#2E7D32", // Dark green for active state
        borderColor: "#2E7D32",
    },
    filterChipText: {
        color: "#2E7D32",
        fontSize: 14,
        fontWeight: "600",
    },
    filterChipTextActive: {
        color: "white",
    },
    historyListContainer: {
        paddingBottom: 40,
    },
    historyCard: {
        backgroundColor: "white",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#E8F5E9",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
    },
    historyImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    cardContent: {
        flex: 1,
    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    historyDate: {
        fontSize: 12,
        color: "#7CB342", // Muted green
        fontWeight: "600",
    },
    plantName: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 4,
    },
    diagnosisText: {
        fontSize: 14,
        color: "#757575",
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusBadgeHealthy: {
        backgroundColor: "#E8F5E9", // Light green background
    },
    statusBadgeIssue: {
        backgroundColor: "#FFEBEE", // Light red background for issues
    },
    statusTextHealthy: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#2E7D32",
    },
    statusTextIssue: {
        fontSize: 10,
        fontWeight: "bold",
        color: "#C62828",
    },
    emptyStateContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1B5E20",
        marginTop: 15,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: "#7CB342",
        marginTop: 8,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    deleteButton: {
        padding: 5,
    }
});

// Exporting the styles 
export default styles;