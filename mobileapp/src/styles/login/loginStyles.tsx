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
        backgroundColor: "white", 
        alignItems: "center", 
        textAlign: "center", 
    }, 
    ImageBackground: {
        width: SCREEN_WIDTH, 
        marginTop: 0, 
        height: 400, 
        marginBottom: 0
    }, 
    keyboardAvoidingView: {
        flex: 1, 
        width: "100%", 
    }, 
    imageBackground: {
        width: SCREEN_WIDTH, 
        marginTop: 0, 
        height: 400, 
        marginBottom: 0, 
    },
    imageStyle: {
        opacity: 0.4, 
    },
    contentContainer: {
        alignItems: "center", 
        paddingVertical: 50, 
        marginTop: 60, 
    },
    imageSectionDiv: {
        alignItems: "center",
    }, 
    imageLogo: {
        height: 100, 
        width: 100, 
        borderRadius: 20, 
        marginBottom: 10, 
    }, 
    headerTextDiv: {
        marginBottom: 10, 
        textAlign: "center", 
        fontFamily: "Poppins_700Bold"
    }, 
    headerText: {
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "bold", 
        color: "green", 
        fontFamily: "Poppins_700Bold"
    }, 
    messageDisplayDiv: {
        alignItems: "center", 
        color: "#393d3a", 
        fontSize: 18, 
        fontWeight: "bold", 
        fontFamily: "Poppins_400Regular"
    },
    registerContainer: {
        backgroundColor: "#e9dbc8", 
        alignItems: "flex-start", 
        padding: 25, 
        width: SCREEN_WIDTH, 
        flex: 1, 
    }, 
    input: {
        width: SCREEN_WIDTH * 0.87,
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 14,
        backgroundColor: '#fff',
        fontSize: 16,
        borderTopEndRadius: 5,
        borderBottomColor: "#79a885",
        fontFamily: "Poppins_400Regular",
        flexDirection: "row", 
        alignItems: "center", 
        paddingHorizontal: 10,  
    }, 
    emailLogo: {
        marginRight: 10, 
    },
    emailTextInput: {
        flex: 1, 
        height: "100%", 
        fontSize: 16,
        fontFamily: "Poppins_400Regular", 
    },
    passwordLogo: {
        marginRight: 10, 
    },
    passwordTextInput: {
        flex: 1, 
        height: "100%", 
        fontSize: 16,
        fontFamily: "Poppins_400Regular"
    },
    button: {
        width: SCREEN_WIDTH * 0.87,
        backgroundColor: '#468745', // Green submit button
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
        fontFamily: "Poppins_400Regular"
    },
    dontHaveAnAccountDiv: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 13,
        flexDirection: "row", 
        fontFamily: "Poppins_400Regular"
    },
    dontHaveAnAccountText: {
        fontSize: 15,
        fontFamily: "Poppins_400Regular" 
    },
    signUpText: {
        fontWeight: "bold", 
        fontSize: 15,  
        color: "#42a95c",
        fontFamily: "Poppins_400Regular"
    }
})

// Exporting the styles 
export default styles; 