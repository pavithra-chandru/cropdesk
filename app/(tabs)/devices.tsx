import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Device = {
  id: string;
  name: string;
  plotNo: string;
  status: "Active" | "Inactive";
};

const connectedDevices: Device[] = [
  { id: "1", name: "Nest-0F77", plotNo: "1234", status: "Active" },
  { id: "2", name: "Nest-0F77", plotNo: "1234", status: "Active" },
];

const historyDevices: Device[] = [
  { id: "3", name: "Nest-0F77", plotNo: "1234", status: "Inactive" },
];

export default function DevicesScreen() {
  const [pin, setPin] = useState("");
  const [showFull, setShowFull] = useState(false);

  const renderDeviceCard = (device: Device, showMenu?: boolean) => (
    <View style={styles.deviceCard}>
      {/* Device image */}
      <View style={styles.deviceImageContainer}>
        <Ionicons name="hardware-chip-outline" size={50} color="white" />
      </View>

      {/* Device info */}
      <View style={{ flex: 1 }}>
        <View style={styles.deviceHeader}>
          <Text style={styles.deviceName}>{device.name}</Text>
          <View style={styles.iconRow}>
            <Ionicons name="wifi" size={18} color="white" />
            <Ionicons
              name="battery-half"
              size={20}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>

        <Text style={styles.deviceDetail}>
          <Text style={styles.label}>Plot No: </Text>
          {device.plotNo}
        </Text>

        <View style={styles.statusRow}>
          <Text style={styles.label}>Status : </Text>
          <View
            style={[
              styles.statusPill,
              device.status === "Active" ? styles.active : styles.inactive,
            ]}
          >
            <Text style={styles.statusText}>{device.status}</Text>
          </View>
        </View>
      </View>

      {showMenu && <Ionicons name="ellipsis-vertical" size={20} color="white" />}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devices</Text>

      {/* PIN input */}
      <View style={styles.pinOuter}>
        <View style={styles.pinContainer}>
          {[...Array(6)].map((_, i) => (
            <TextInput
              key={i}
              style={styles.pinBox}
              keyboardType="numeric"
              maxLength={1}
              value={pin[i] || ""}
              onChangeText={(val) => {
                const pinArr = pin.split("");
                pinArr[i] = val;
                setPin(pinArr.join(""));
              }}
            />
          ))}
        </View>
        <Text style={styles.pinLabel}>Enter the pin</Text>
      </View>

      {/* Scanner Row */}
      <TouchableOpacity
        style={styles.scannerRow}
        onPress={() => setShowFull(true)}
      >
        <View style={styles.scannerIconContainer}>
          <Ionicons name="qr-code" size={40} color="white" />
        </View>
        <Text style={styles.scannerText}>
          Scan the QR to Connect the Device
        </Text>
      </TouchableOpacity>

      {/* Fullscreen Modal */}
      <Modal visible={showFull} transparent animationType="fade">
        <View style={styles.modalBg}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setShowFull(false)}
          >
            <Text style={styles.closeTxt}>Close</Text>
          </TouchableOpacity>
          <Ionicons name="qr-code" size={250} color="white" />
        </View>
      </Modal>

      {/* Connected Devices */}
      <Text style={styles.sectionTitle}>Connected Device</Text>
      <FlatList
        data={connectedDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderDeviceCard(item)}
      />

      {/* History */}
      <Text style={styles.sectionTitle}>History</Text>
      <FlatList
        data={historyDevices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderDeviceCard(item, true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 16, paddingTop: 40 },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
  },

  // PIN area
  pinOuter: {
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  pinBox: {
    backgroundColor: "#000",
    color: "#fff",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    width: 40,
    height: 50,
    textAlign: "center",
  },
  pinLabel: { color: "#ccc", textAlign: "center" },

  // QR scanner card
  scannerRow: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    padding: 16,
    marginBottom: 20,
  },
  scannerIconContainer: {
    backgroundColor: "#0D47A1",
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
  },
  scannerText: { color: "#fff", fontSize: 16, flex: 1 },

  // Modal
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeBtn: { position: "absolute", top: 40, right: 20, padding: 10 },
  closeTxt: { color: "#fff", fontSize: 18 },

  // Section title
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },

  // Device card
  deviceCard: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  deviceImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#0D47A1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  deviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deviceName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  iconRow: { flexDirection: "row", alignItems: "center" },
  deviceDetail: { color: "#ccc", marginTop: 6 },
  label: { color: "#fff", fontWeight: "500" },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  statusPill: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  active: { backgroundColor: "green" },
  inactive: { backgroundColor: "red" },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "600" },
});
