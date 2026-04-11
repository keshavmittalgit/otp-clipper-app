import GoogleIcon from "@/components/google-icon";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// IMPORTANT: Replace this with the Web client ID found in Firebase Console -> Authentication -> Sign-in method -> Google.
// You still need the Web Client ID here even if building for Native Mobile.
GoogleSignin.configure({
  webClientId:
    "274540209132-9vfq6o9tpv5g24hfa6mjqha26h0u61in.apps.googleusercontent.com",
  offlineAccess: true,
});

export default function Login() {
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();

      let idToken;
      if (signInResult.type === "success") {
        idToken = signInResult.data.idToken;
      } else {
        return; // Sign in was cancelled or in progress
      }

      const auth = getAuth();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);

      console.log("Logged in user:", userCredential.user);
      // @ts-ignore
      router.replace("/scan");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Login failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Sign‑up flow – currently mirrors Google login but navigates to a signup screen after success
  const handleSignUp = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      const signInResult = await GoogleSignin.signIn();

      let idToken;
      if (signInResult.type === "success") {
        idToken = signInResult.data.idToken;
      } else {
        return; // Sign in was cancelled or in progress
      }

      const auth = getAuth();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredential);

      console.log("Sign‑up successful");
      // @ts-ignore
      router.replace("/scan"); // after sign‑up, navigate to scanner
    } catch (error) {
      console.error("Google Sign‑Up Error:", error);
      alert("Sign‑up failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
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
          <View className="items-center mb-14">
            <View className=" bg-transparent rounded-3xl justify-center items-center overflow-hidden">
              <View className="w-48 h-48 bg-transparent rounded-3xl justify-center items-center   overflow-hidden ">
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
              className="h-[64px] rounded-full justify-center items-center flex-row bg-black/90 dark:bg-white"
              onPress={handleGoogleLogin}
            >
              {loading ? (
                <ActivityIndicator
                  size={24}
                  className="dark:text-black text-white"
                />
              ) : (
                <GoogleIcon size={24} />
              )}
              <View className="w-4" />
              <Text className="text-white dark:text-black text-xl font-bold tracking-tight rounded-full">
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-black dark:text-white opacity-40 text-base">
                If you don&apos;t have an account{" "}
              </Text>
              <TouchableOpacity onPress={handleSignUp} activeOpacity={0.8}>
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
