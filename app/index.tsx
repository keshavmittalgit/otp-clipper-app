import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, LogBox, View } from "react-native";

// Ignore specific noisy warnings
LogBox.ignoreLogs([
  "Unable to activate keep awake",
  "SafeAreaView has been deprecated",
]);

// Suppress unhandled promise rejections for "Keep Awake" in development
if (__DEV__) {
  // @ts-ignore
  const originalHandler = global.onunhandledrejection;
  // @ts-ignore
  global.onunhandledrejection = (id, error) => {
    if (error?.message?.includes("keep awake")) {
      return;
    }
    if (typeof originalHandler === "function") {
      // @ts-ignore
      originalHandler(id, error);
    }
  };
}

export default function Index() {
  const router = useRouter();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    // Listen for authentication state changes using modular API
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!initializing) {
      if (user) {
        // @ts-ignore
        router.replace("/scan");
      } else {
        // @ts-ignore
        router.replace("/login");
      }
    }
  }, [initializing, user]);

  return (
    <View className="flex-1 justify-center items-center bg-white dark:bg-black">
      <ActivityIndicator size="large" color="#000" className="opacity-50" />
    </View>
  );
}
