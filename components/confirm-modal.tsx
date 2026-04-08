import React from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  description: string;
  confirmText: string;
  confirmButtonColor?: string; // e.g. "bg-red-700"
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  description,
  confirmText,
  confirmButtonColor = "bg-red-700",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable
        className="flex-1 bg-black/60 justify-center items-center px-6"
        onPress={onCancel}
      >
        <Pressable
          className="w-full bg-[#121212] rounded-[32px] p-8 border border-white/5 shadow-2xl"
          onPress={(e) => e.stopPropagation()}
        >
          <Text className="text-white text-2xl font-bold text-center mb-3">
            {title}
          </Text>
          <Text className="text-zinc-400 text-base text-center mb-6 leading-6">
            {description}
          </Text>

          <View className="flex-row gap-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onCancel}
              className="flex-1 h-14 bg-[#252525] rounded-2xl justify-center items-center"
            >
              <Text className="text-white text-lg font-bold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onConfirm}
              className={`flex-1 h-14 ${confirmButtonColor} rounded-2xl justify-center items-center`}
            >
              <Text className="text-white text-lg font-bold">
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
