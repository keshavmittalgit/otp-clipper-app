import AuthenticatedLayout from "@/components/authenticated-layout";
import LinkIcon from "@/components/link-icon";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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

export default function Dashboard() {
  const router = useRouter();

  return (
    <AuthenticatedLayout>
      <View className="flex-1 px-8 justify-center items-center">
        <View className="bg-green-500/10 p-6 rounded-[32px] items-center border border-green-500/20 mb-8">
          <View className="bg-green-500 w-16 h-16 rounded-full items-center justify-center mb-4 shadow-lg shadow-green-500/50">
            <LinkIcon size={32} color="white" />
          </View>
          <Text className="text-white text-2xl font-black tracking-tight">
            Connected
          </Text>
          <Text className="text-zinc-500 font-bold mt-2 text-center">
            You are now connected to your PC.{"\n"}All OTPs will be
            automatically synced.
          </Text>
        </View>

        <TouchableOpacity
          className="bg-[#121212] flex-row items-center px-8 py-4 rounded-full border border-white/5"
          // @ts-ignore
          onPress={() => router.replace("/scan")}
        >
          <Ionicons name="refresh" size={18} color="white" opacity={0.6} />
          <Text className="text-white font-bold ml-3 opacity-60 uppercase text-xs tracking-widest">
            Re-pair Device
          </Text>
        </TouchableOpacity>
      </View>
    </AuthenticatedLayout>
  );
}
