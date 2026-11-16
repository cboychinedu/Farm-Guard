// Importing the necessary modules 
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    Image
} from 'react-native';

// Creating the dummy menu button  
const Menu = () => {
    // Rendering the dummy menu 
    return(
        <SafeAreaView>
            <TouchableOpacity> 
                <View> 
                    <Text> Menu </Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

// Exporting the menu 
export default Menu; 