// Importing the necessary modules 
import { useEffect, useState } from 'react'; 
import * as SecureStore from "expo-secure-store"; 

// Creating the auth custom hook 
const Auth = () => {
    // Setting up necessary states 
    const [token, setToken] = useState<string | null>(null); 
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Creating a function to load the token 
    const loadToken = async () => {
        // Using try catch block 
        try {
            // Read the stored token from device storage
            const storedToken = await SecureStore.getItemAsync("farmGuardToken");  
            
            // Setting the passengers or drivers token
            setToken(storedToken); 
        } 
        // Catching the error
        catch (error:any) {
            // Logging the error 
            console.log("Failed to load the token from SecureStore:", error); 

            // Setting the token as null value 
            setToken(null);
        } 
        // Finally, execute the block of code below 
        finally {
            // Setting the loading as false 
            setIsLoading(false);
        }
    }; 

    // Function to clear token on logout
    const logout = async () => {
        // Using try, catch block to remove the token from the 
        // phone storage 
        try {
            // Delete the driver's token and the user's token 
            await SecureStore.deleteItemAsync("farmGuardToken");

            // Set the token as a null value
            setToken(null);
        } 
        // Catch the error, and log the error to the console 
        catch (error) {
            // Logging the error to the console 
            console.log("Failed to remove token:", error);
        }
    };

    // Load token on mount 
    useEffect(() => {
        // Call the load token 
        loadToken();
    }, []); 

    // Returning the token, is loading 
    return { token, isLoading, reloadToken: loadToken, logout }; 
};

// Exporting the component 
export default Auth;