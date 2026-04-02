import GoogleIcon from "@/components/google-icon";
// import { auth } from "@/firebaseConfig";
import * as Google from "expo-auth-session/providers/google";
import { router } from "expo-router";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import React, { useEffect } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Replace these with your actual IDs from the Google Cloud Console
const WEB_CLIENT_ID = "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com";
const IOS_CLIENT_ID = "YOUR_IOS_CLIENT_ID.apps.googleusercontent.com";
const ANDROID_CLIENT_ID = "YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com";

export default function Login() {
  const insets = useSafeAreaInsets();

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    androidClientId: ANDROID_CLIENT_ID,
  });

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     const { id_token } = response.params;
  //     const credential = GoogleAuthProvider.credential(id_token);
  //     signInWithCredential(auth, credential)
  //       .then((userCredential) => {
  //         console.log("Logged in user:", userCredential.user);
  //         router.replace("/");
  //       })
  //       .catch((error) => {
  //         console.error("Firebase Login Error:", error);
  //         alert("Login failed: " + error.message);
  //       });
  //   }
  // }, [response]);

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 20,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          <View className="items-center mb-32">
            <View className=" bg-transparent rounded-3xl justify-center items-center overflow-hidden">
              <View className="w-48 h-48 bg-transparent rounded-3xl justify-center items-center mb-4   overflow-hidden ">
                <Image
                  source={require("../assets/images/icon.png")}
                  className="w-full h-full shadow-2xl"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-[48px] font-extrabold text-black/90 dark:text-white mb-4 -tracking-widest text-center">
                OTP Clipper
              </Text>
            </View>

            <Text className="text-lg text-black dark:text-white opacity-50 font-medium text-center">
              Login to connect to your pc
            </Text>
          </View>

          <View className="w-full">
            <TouchableOpacity
              activeOpacity={0.8}
              disabled={!request}
              className={`h-[64px] rounded-full justify-center items-center flex-row bg-black/90 dark:bg-white ${!request ? "opacity-50" : ""}`}
              onPress={handleGoogleLogin}
            >
              <GoogleIcon size={24} />
              <View className="w-4" />
              <Text className="text-white dark:text-black text-xl font-bold tracking-tight rounded-full">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-8">
              <Text className="text-black dark:text-white opacity-40 text-base">
                If you don't have an account{" "}
              </Text>
              <TouchableOpacity onPress={() => alert("Sign up coming soon!")}>
                <Text className="text-black dark:text-white font-extrabold text-base underline decoration-slice">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
