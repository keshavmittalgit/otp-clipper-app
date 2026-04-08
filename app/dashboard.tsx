import ConfirmModal from "@/components/confirm-modal";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

import { Image, Text, TouchableOpacity, View } from "react-native";
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
        <View className="bg-[#121212] dark:bg-[#121212] rounded-[24px] p-4 flex-row items-center border border-white/5 shadow-2xl">
          <View className="flex-1 pl-1.5">
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

      <ConfirmModal
        visible={showLogoutModal}
        title="Logout"
        description="Are you sure you want to logout? You will need to sign in again to access  your account and settings."
        confirmText="Logout"
        confirmButtonColor="bg-red-700"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </View>
  );
}
