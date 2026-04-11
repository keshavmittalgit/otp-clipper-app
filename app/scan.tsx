import AuthenticatedLayout from "@/components/authenticated-layout";
import ScannerView from "@/components/scanner-view";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function ScanPage() {
  const router = useRouter();
  const [isScanning, setIsScanning] = useState(true);

  const handleScanData = (data: string) => {
    // In a real app, you'd save this pairing info to Firebase or Storage
    console.log("Scanned Pairing Data:", data);
    // @ts-ignore
    router.replace("/dashboard");
  };

  return (
    <AuthenticatedLayout>
      <ScannerView
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        onScan={handleScanData}
      />
    </AuthenticatedLayout>
  );
}
