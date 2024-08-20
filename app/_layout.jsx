import { Stack } from "expo-router";
import { useFonts } from "expo-font";
// import NameState from "../context/ContextState";
import { StatusBar } from 'expo-status-bar';
import { ClerkProvider } from "@clerk/clerk-expo";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import StartScreen from "@/components/StartScreen";

export default function RootLayout() {
  const [fontsLoaded, fontsError] = useFonts({
    raleway: require("../assets/fonts/Raleway-Regular.ttf"),
    ralewayMedium: require("../assets/fonts/Raleway-Medium.ttf"),
    ralewaySemiBold: require("../assets/fonts/Raleway-SemiBold.ttf"),
    ralewayBold: require("../assets/fonts/Raleway-Bold.ttf"),
  });
  if (!fontsLoaded && !fontsError) {
    return;
  }
  const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Clerk has been loaded with development keys")
  ) {
    // Ignore this specific warning
    return;
  }
  originalWarn(...args);
};

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SignedIn>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="dark" />
      </SignedIn>
        <SignedOut>
          <StartScreen />
        </SignedOut>
    </ClerkProvider>
  );
}
