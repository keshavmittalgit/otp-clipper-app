import { Redirect } from "expo-router";

export default function Home() {
  // Automatically redirect to the login screen
  return <Redirect href="/login" />;
}
