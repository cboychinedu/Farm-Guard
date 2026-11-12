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
        display: "contents", 
        backgroundColor: "white"
    }, 
    keyboardAvoidingView: {
        flex: 1, 
        width: "100%", 
    },
}); 

// Exporting the styles 
export default styles; 