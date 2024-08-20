import { Image, Text, View } from "react-native";
import React, { useEffect } from "react";
import { commonStyles } from "../styles/commonStyles.jsx";
import Button from "./Button/Button.jsx";
import { Colors } from "@/constants/Colors";
import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()
const StartScreen = () => {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
      try {
        const { createdSessionId, setActive } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/(tabs)/home/index'),
        })
  
        if (createdSessionId) {
          setActive({ session: createdSessionId })
        } else {
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
  }, [])
  return (
    <View style={commonStyles.container}>
      <Image
        style={commonStyles.mainImage}
        source={require("../assets/images/login.png")}
      />
      <View style={commonStyles.containerWrapper}>
        <Text style={commonStyles.heading}>
          Ready to Make a{" "}
          <Text style={{ color: Colors.button }}> new Friend</Text>
        </Text>
        <Text style={commonStyles.desc}>
          Let's adopt the pet which you like and make life happy again.
        </Text>
        <Button title="Get Started" handlePress={onPress} />
      </View>
    </View>
  );
};

export default StartScreen;
