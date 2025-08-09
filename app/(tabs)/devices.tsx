import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type Device = {
  id: string;
  name: string;
  plotNo: string;
  status: "Active" | "Inactive";
 
};

export default function DevicesScreen() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);

  const connectedDevices: Device[] = [
    { id: "1", name: "Nest-0F77", plotNo: "1234", status: "Active" },
    { id: "2", name: "Nest-0F77", plotNo: "1234", status: "Active" },
  ];

  const historyDevices: Device[] = [
    { id: "3", name: "Nest-0F77", plotNo: "1234", status: "Inactive" },
  ];

  const renderDeviceCard = (device: Device, showMenu?: boolean) => (
    <View style={styles.deviceCard}>
      <Image source={device.image} style={styles.deviceImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceDetails}>Plot No: {device.plotNo}</Text>
        <View style={styles.statusRow}>
          <Text style={styles.deviceDetails}>Status :</Text>
          <Text
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  device.status === "Active" ? "#2e7d32" : "#b71c1c",
              },
            ]}
          >
            {device.status}
          </Text>
        </View>
      </View>
      {showMenu ? (
        <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
      ) : (
        <Ionicons name="wifi" size={20} color="#fff" />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Devices</Text>

      {/* PIN Input */}
      <Text style={styles.label}>Enter the pin</Text>
      <View style={styles.pinRow}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.pinBox}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => {
              const newPin = [...pin];
              newPin[index] = text;
              setPin(newPin);
            }}
          />
        ))}
      </View>

      {/* QR Scan Card */}
      <TouchableOpacity style={styles.qrCard}>
        <Ionicons name="qr-code-outline" size={50} color="#3b82f6" />
        <Text style={styles.qrText}>Scan the QR to Connect the Device</Text>
      </TouchableOpacity>

      {/* Connected Devices */}
      <Text style={styles.sectionTitle}>Connected Device</Text>
      {connectedDevices.map((device) => renderDeviceCard(device))}

      {/* History */}
      <Text style={styles.sectionTitle}>History</Text>
      {historyDevices.map((device) => renderDeviceCard(device, true))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 16,
  },
  header: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "center",
  },
  label: {
    color: "#fff",
    marginBottom: 8,
    fontSize: 16,
  },
  pinRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  pinBox: {
    width: 45,
    height: 50,
    backgroundColor: "#111",
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
  },
  qrCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  qrText: {
    color: "#fff",
    marginLeft: 14,
    fontSize: 14,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 8,
    fontSize: 16,
  },
  deviceCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  deviceImage: {
    width: 50,
    height: 70,
    resizeMode: "contain",
    marginRight: 14,
  },
  deviceName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deviceDetails: {
    color: "#ccc",
    fontSize: 13,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusBadge: {
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
    fontSize: 12,
    overflow: "hidden",
  },
});
