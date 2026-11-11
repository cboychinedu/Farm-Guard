// Importing the necessary modules 
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { useRouter } from 'expo-router';
import styles from "@/styles/landingPage/landingPageStyles";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define your navigation stack parameter list
export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  Register: undefined;
};

// Type the navigation prop for this specific screen
type LandingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Landing'
>;

// Creating the landing screen prop interface 
interface LandingScreenProps {
  navigation: LandingScreenNavigationProp;
}

// Creating the landing page 
const LandingScreen: React.FC<LandingScreenProps> = ({ navigation }) => {
  // Creating the router object 
  const router = useRouter();

  // Load the poppins font family 
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  // IMPORTANT: Wait for fonts to load before rendering the UI
  if (!fontsLoaded) {
    return null;
  }

  // Rendering the component 
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Logo Placeholder */}
        <View style={styles.logoContainer}>
          <View style={styles.logoShield}>
            <Text style={styles.logoLeaf}>🌿</Text>
          </View>
          <Text style={styles.brandName}>FarmGuard</Text>
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to FarmGuard</Text>
          <Text style={styles.subtitle}>
            Identify and manage plant health issues instantly.
            Confidence in every scan.
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.primaryButtonText}>LOG IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => router.push('/(auth)/register' as any)}
          >
            <Text style={styles.secondaryButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Exporting the landing page 
export default LandingScreen;