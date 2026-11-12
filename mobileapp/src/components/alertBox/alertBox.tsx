// Importing the necessary modules 
import React from 'react'; 
import {
    Modal, 
    View, 
    TouchableOpacity,
    Text
} from 'react-native';
import { Ionicons } from "@expo/vector-icons"; 
import COLORS from "@/styles/colors/colors"; 
import styles from "@/styles/alertBox/alertBoxStyles"; 

// Creating the interface for the custom alert props 
interface CustomAlertProps {
    visible: boolean; 
    type: "success" | "error" | "warning"; 
    title?: string; 
    message: string; 
    onClose: () => void; 
}

// Creating the custom alert 
const CustomAlert: React.FC<CustomAlertProps> = ({visible, type, title, message, onClose}) => {
    // Getting the isSuccess value 
    const isSuccess = type === "success"; 

    // Rendering the alert box 
    return(
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        > 
            <View style={styles.overlay}>
                <View style={styles.alertCard}>
                    {/* Status Icon */}
                    <View
                        style={[
                            styles.iconWrapper,
                            { backgroundColor: isSuccess ? "#E8F5E9" : "#FFEBEE" },
                        ]}
                    >
                        <Ionicons
                            name={isSuccess ? "checkmark-circle" : "alert-circle"}
                            size={48}
                            color={isSuccess ? "#2E7D32" : "#D32F2F"}
                        />
                    </View>

                    {/* Alert Title */}
                    <Text style={styles.alertTitle}>
                        {title || (isSuccess ? "Success" : "Error")}
                    </Text>

                    {/* Alert Message */}
                    <Text style={styles.alertMessage}>{message}</Text>

                    {/* Action Button */}
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            { backgroundColor: isSuccess ? COLORS.primary || "#007AFF" : "#D32F2F" },
                        ]}
                        activeOpacity={0.85}
                        onPress={onClose}
                    >
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

// Exporting the custom alert 
export default CustomAlert; 