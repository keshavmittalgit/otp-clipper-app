import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Linking, Text, TouchableOpacity, Vibration, View } from "react-native";
import ConfirmModal from "./confirm-modal";
import FlashIcon from "./flash-icon";
import GalleryIcon from "./gallery-icon";
import ScanIcon from "./scan-icon";

interface ScannerViewProps {
  isScanning: boolean;
  setIsScanning: (value: boolean) => void;
  onScan: (data: string) => void;
}

export default function ScannerView({
  isScanning,
  setIsScanning,
  onScan,
}: ScannerViewProps) {
  const hasScanned = React.useRef(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [flashlight, setFlashlight] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  const handleScanPress = () => {
    if (!permission?.granted) {
      if (permission?.canAskAgain) {
        requestPermission();
      } else {
        setShowPermissionModal(true);
      }
    } else {
      // If already granted, the camera is auto-scanning, so no action needed on the button itself
    }
  };

  const handleFlashToggle = () => {
    if (permission?.granted) {
      setFlashlight(!flashlight);
    } else {
      // Use the flash button as a trigger for permission if missing
      handleScanPress();
    }
  };

  return (
    <View className="flex-1 px-6 justify-center">
      {/* Camera Frame */}
      <View className="items-center mb-8">
        <View className="w-full aspect-square max-w-[320px] bg-zinc-900 rounded-[40px] border-4 border-white overflow-hidden shadow-2xl relative">
          {permission?.granted ? (
            <CameraView
              facing="back"
              enableTorch={flashlight}
              style={{ flex: 1 }}
              onBarcodeScanned={({ data }) => {
                // Instant Synchronous Lockout
                if (hasScanned.current) return;
                hasScanned.current = true;

                setIsScanning(false);
                console.log("QR detected! Data:", data);
                Vibration.vibrate([0, 150, 50, 150]);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                onScan(data);
              }}
            />
          ) : (
            <TouchableOpacity
              className="flex-1 items-center justify-center p-8"
              activeOpacity={0.2}
              onPress={handleScanPress}
            >
              <Ionicons
                name="camera-outline"
                size={48}
                color="white"
                opacity={0.2}
              />
              <Text className="text-white/40 text-center mt-4 font-bold text-sm">
                Camera permission required to scan codes
              </Text>
            </TouchableOpacity>
          )}

          {/* Corner Markers */}
          <View className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-white m-4 rounded-tl-xl" />
          <View className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-white m-4 rounded-tr-xl" />
          <View className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-white m-4 rounded-bl-xl" />
          <View className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-white m-4 rounded-br-xl" />
        </View>
        <Text className="text-zinc-500 font-bold tracking-[2px] mt-6 text-xs">
          ALIGN QR CODE WITHIN THE FRAME
        </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-4 mt-6 mb-8">
        <TouchableOpacity
          className="flex-[2] bg-[#121212] rounded-[24px] p-6 h-28 justify-between border border-white/5"
          activeOpacity={0.2}
        >
          <GalleryIcon size={24} />
          <Text className="text-white font-bold text-[10px] tracking-widest uppercase opacity-60">
            Import from Gallery
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 ${flashlight && permission?.granted ? "bg-white/20" : "bg-[#121212]"} rounded-[24px] p-6 h-28 justify-between items-center border border-white/5`}
          activeOpacity={0.2}
          onPress={handleFlashToggle}
        >
          <FlashIcon size={24} color={flashlight ? "#ffffff" : "#f3f3f3"} />
          <Text className="text-white font-bold text-[10px] tracking-widest uppercase opacity-60">
            Flash
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={permission?.granted ? 1 : 0.9}
        onPress={handleScanPress}
        className="bg-white flex-row items-center justify-center h-16 rounded-full shadow-xl"
      >
        <ScanIcon size={24} color="black" />
        <Text className="text-black font-bold text-lg tracking-tight ml-3 uppercase">
          {permission?.granted ? "Scanning" : "Allow Camera"}
        </Text>
      </TouchableOpacity>

      <ConfirmModal
        visible={showPermissionModal}
        title="Camera Access"
        description={
          permission?.canAskAgain
            ? "To scan QR codes and connect to your PC, we need permission to use your camera."
            : "Camera access is permanently disabled. Please enable it in your system settings to use the scanner."
        }
        confirmText={permission?.canAskAgain ? "Allow" : "Open Settings"}
        confirmButtonColor={
          permission?.canAskAgain ? "bg-blue-500" : "bg-blue-500"
        }
        onConfirm={() => {
          setShowPermissionModal(false);
          if (permission?.canAskAgain) {
            requestPermission();
          } else {
            Linking.openSettings();
          }
        }}
        onCancel={() => setShowPermissionModal(false)}
      />
    </View>
  );
}
