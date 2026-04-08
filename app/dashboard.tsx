import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  Image,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
      originalHandler.apply(global, [id, ...arguments]);
    }
  };
}

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<{
    displayName?: string;
    email?: string;
    photoURL?: string | null;
  } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const current = auth.currentUser;
    if (current) {
      setUser({
        displayName: current.displayName ?? "User",
        email: current.email ?? "",
        photoURL: current.photoURL,
      });
    } else {
      // If no logged‑in user, redirect to login
      // @ts-ignore
      router.replace("/login");
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      setShowLogoutModal(false);
      const auth = getAuth();

      // Clear Google Sign-In session to force account selection next time
      try {
        await GoogleSignin.signOut();
        await GoogleSignin.revokeAccess();
      } catch (e) {
        // Ignore "SIGN_IN_REQUIRED" or other cleanup errors
        console.log("Google session cleanup skipped:", e);
      }

      await signOut(auth);
      // @ts-ignore
      router.replace("/login");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Top Navbar Card */}
      <View style={{ paddingTop: insets.top + 10 }} className="px-4">
        <View className="bg-[#121212] dark:bg-[#121212] rounded-[24px] pl-6 p-4 flex-row items-center border border-white/5 shadow-2xl">
          <View className="flex-1">
            <Text className="text-2xl font-black text-white mb-0.5 tracking-tight">
              OTP Clipper
            </Text>
            <Text className="text-sm text-zinc-400 font-bold opacity-80">
              {user?.email}
            </Text>
          </View>

          <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
            {user?.photoURL ? (
              <View className="ml-4 rounded-full border-2 border-zinc-800 p-0.5">
                <Image
                  source={{ uri: user.photoURL }}
                  className="w-14 h-14 rounded-full"
                />
              </View>
            ) : (
              <View className="ml-4 w-14 h-14 rounded-full border-2 border-zinc-800 bg-zinc-800 items-center justify-center">
                <Text className="text-white font-bold">
                  {user?.displayName?.charAt(0)}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Main content placeholder */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl text-black dark:text-white">
          Welcome to OTP Clipper!
        </Text>
      </View>

      {/* Custom Logout Modal */}
      <Modal
        visible={showLogoutModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/60 justify-center items-center px-6"
          onPress={() => setShowLogoutModal(false)}
        >
          <Pressable
            className="w-full bg-[#121212] rounded-[32px] p-8 border border-white/5 shadow-2xl"
            onPress={(e) => e.stopPropagation()}
          >
            <Text className="text-white text-2xl font-bold text-center mb-3">
              Logout
            </Text>
            <Text className="text-zinc-400 text-base text-center mb-6 leading-6">
              Are you sure you want to logout? You will need to sign in again to
              access your account and settings.
            </Text>

            <View className="flex-row gap-4">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setShowLogoutModal(false)}
                className="flex-1 h-14 bg-[#252525] rounded-2xl justify-center items-center"
              >
                <Text className="text-white text-lg font-bold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={confirmLogout}
                className="flex-1 h-14 bg-red-600 rounded-2xl justify-center items-center"
              >
                <Text className="text-white text-lg font-bold">Logout</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
