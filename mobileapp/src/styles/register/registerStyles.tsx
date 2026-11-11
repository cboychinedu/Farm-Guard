// Importing the necessary modules 
import { StyleSheet, Dimensions } from "react-native";

// Getting the width and height of the mobile device 
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Creating the style sheet 
const styles = StyleSheet.create({
    container: {
        display: "contents",
        backgroundColor: 'white',
        alignItems: "center",
        textAlign: 'center'
    },
    imageBackground: {
        width: SCREEN_WIDTH,
        marginTop: 0,
        height: 400,
        marginBottom: 0
    },
    contentConainer: {
        alignItems: 'center',
        paddingVertical: 50,
        marginTop: 60
    },
    imageLogo: {
        height: 100,
        width: 100,
        borderRadius: 20,
        marginBottom: 10,
    },
    headerTextDiv: {
        marginBottom: 10,
        textAlign: 'center'
    },
    headerText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: "bold",
        color: "green",
    },
    messageDisplayDiv: {
        alignItems: 'center',
        color: "#393d3a",
        fontSize: 18,
        fontWeight: "bold"
    },
    registerContainer: {
        backgroundColor: "#e9dbc8",
        alignItems: "flex-start",
        padding: 25,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    input: {
        width: SCREEN_WIDTH * 0.87,
        height: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        borderTopEndRadius: 5,
        borderBottomColor: "#79a885",
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
    },
    alreadyHaveAnAccountDiv: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center", 
        marginTop: 15,
        flexDirection: "row", 
    }, 
    alreadyHaveAnAccountText: {
        fontSize: 18,
    },  
    signInText: {
        fontWeight: "bold", 
        fontSize: 18,  
    }
});

// Exporting the styles component 
export default styles; 