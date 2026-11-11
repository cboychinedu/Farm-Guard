// Importing the necessary modules
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { jwtDecode } from "jwt-decode";
import Auth from "@/auth/auth"; 

// Keep native splash screen visible while loading auth state
SplashScreen.preventAutoHideAsync();

// Creating the root layout 
const RootLayout = () => {
  // Getting the router object
  const router = useRouter();
  const { token, isLoading } = Auth();

  // Using effect to perform the function 
  useEffect(() => {
    if (isLoading) return;

    // Hide the native splash screen once token load finishes
    SplashScreen.hideAsync();

    // Perform immediate navigation before rendering index UI
    if (token && typeof token === "string" && token.trim().length > 0) {
      try {
        const decodedToken = jwtDecode<{ userType?: string }>(token);

        if (decodedToken?.userType === "passenger" || decodedToken?.userType === "tokenVerification") {
          router.replace("/(private)/(passengers)/passengers/dashboard" as any);
        } else if (decodedToken?.userType === "driver") {
          router.replace("/(private)/(drivers)/drivers/dashboard" as any);
        }
      } catch (error) {
        console.error("Invalid token on root layout check: ", error);
      }
    }
  }, [token, isLoading]);

  // Block rendering until auth state is determined
  if (isLoading) {
    return null;
  }

  // rendering the pages/screen
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Welcome", headerShown: false }} />
      {/* <Stack.Screen name="(auth)/login" options={{ title: "Login", headerShown: true }} /> */}
      <Stack.Screen name="(auth)/register" options={{ title: "Register Here", headerShown: true }} />
      {/* <Stack.Screen name="(private)/(passengers)" />
      <Stack.Screen name="(private)/(drivers)" /> */}
    </Stack>
  );
};

// Exporting the root layout 
export default RootLayout;