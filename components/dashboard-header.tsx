import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface DashboardHeaderProps {
  user: {
    displayName?: string;
    email?: string;
    photoURL?: string | null;
  } | null;
  onLogout: () => void;
}

export default function DashboardHeader({
  user,
  onLogout,
}: DashboardHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
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

        <TouchableOpacity onPress={onLogout} activeOpacity={0.7}>
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
  );
}
