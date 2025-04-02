import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { ParkingListing } from "./src/components/ParkingListing";

export default function App() {
  return (
    <React.StrictMode>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <ParkingListing />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </React.StrictMode>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
});
