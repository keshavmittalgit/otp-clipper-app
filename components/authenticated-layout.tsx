import ConfirmModal from "@/components/confirm-modal";
import DashboardHeader from "@/components/dashboard-header";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const router = useRouter();
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
      try {
        await GoogleSignin.signOut();
        await GoogleSignin.revokeAccess();
      } catch (e) {
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
      <DashboardHeader user={user} onLogout={handleLogout} />

      {children}

      <ConfirmModal
        visible={showLogoutModal}
        title="Logout"
        description="Are you sure you want to logout? You will need to sign in again to access your account and settings."
        confirmText="Logout"
        confirmButtonColor="bg-red-700"
        onConfirm={confirmLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </View>
  );
}
