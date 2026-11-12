// Importing the necessary modules 
import { useRouter } from "expo-router"; 
import * as SecureStore from "expo-secure-store";
import { Pressable, Text, Alert } from "react-native"; 

// Creating the logout button component 
const LogoutButton = () => {
    // Setting the router instance 
    const router = useRouter(); 

    // Creating a function to handle the logout instance 
    const handleLogout = async () => {
        // Using try catch block to remove the cookie data from the 
        // phone storage 
        try {
            // clear the token in the cookies storage 
            await SecureStore.deleteItemAsync("farmGuardToken"); 

            // Navigate the user to the login page 
            router.replace("/"); 
        }

        // Catch the error 
        catch (error: any) {
            // Show the error to the user 
            Alert.alert(error); 
        }
    }; 

    // Rendering the jsx logout button 
    return(
               <Pressable onPress={handleLogout} style={{ marginRight: 15, padding: 5 }}>
            <Text style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}> 
                Logout 
            </Text>
        </Pressable> 
    )
}

// Exporting the logout button 
export default LogoutButton; 