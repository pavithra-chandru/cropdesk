import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
} from 'react-native';

type Device = {
  id: string;
  name: string;
  plotNo: string;
  status: 'Active' | 'Inactive';
};

const connectedDevices: Device[] = [
  { id: '1', name: 'Nest-0F77', plotNo: '1234', status: 'Active' },
  { id: '2', name: 'Nest-0F77', plotNo: '5678', status: 'Active' },
];

const historyDevices: Device[] = [
  { id: '3', name: 'Nest-0F77', plotNo: '9876', status: 'Inactive' },
];

export default function DevicesScreen() {
  const [pin, setPin] = useState('');
  const [scannerVisible, setScannerVisible] = useState(false);

  const renderDeviceCard = (device: Device, showMenu?: boolean) => (
    <View style={styles.deviceCard}>
      <View style={styles.deviceImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceDetail}>
          <Text style={styles.label}>Plot No: </Text>
          {device.plotNo}
        </Text>
        <View style={styles.statusRow}>
          <Text style={styles.label}>Status: </Text>
          <View
            style={[
              styles.statusPill,
              device.status === 'Active' ? styles.active : styles.inactive,
            ]}
          >
            <Text style={styles.statusText}>{device.status}</Text>
          </View>
        </View>
      </View>
      {showMenu && <View style={styles.menuDots} />}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Devices</Text>

      {/* PIN input */}
      <View style={styles.pinBoxContainer}>
        {[...Array(6)].map((_, i) => (
          <TextInput
            key={i}
            style={styles.pinBox}
            keyboardType="numeric"
            maxLength={1}
            value={pin[i] || ''}
            onChangeText={(val) => {
              const pinArr = pin.split('');
              pinArr[i] = val;
              setPin(pinArr.join(''));
            }}
          />
        ))}
      </View>
      <Text style={styles.pinLabel}>Enter the pin</Text>

      {/* QR Scan */}
      <TouchableOpacity
        style={styles.qrContainer}
        onPress={() => setScannerVisible(true)}
      >
        <View style={styles.qrIcon} />
        <Text style={styles.qrText}>Scan the QR to Connect the Device</Text>
      </TouchableOpacity>

      {/* Connected Devices */}
      <Text style={styles.sectionTitle}>Connected Device</Text>
      {connectedDevices.map((device) => (
        <View key={device.id}>{renderDeviceCard(device)}</View>
      ))}

      {/* History */}
      <Text style={styles.sectionTitle}>History</Text>
      {historyDevices.map((device) => (
        <View key={device.id}>{renderDeviceCard(device, true)}</View>
      ))}

      {/* Scanner Modal */}
      <Modal visible={scannerVisible} animationType="slide">
        <View style={styles.scannerContainer}>
          <View style={styles.fakeScanner}>
            <Text style={styles.scannerText}>📷 Dummy QR Scanner</Text>
            <Text style={styles.scannerSubText}>
              Pretend this is scanning a QR code...
            </Text>
          </View>
          <Pressable
            style={styles.closeButton}
            onPress={() => setScannerVisible(false)}
          >
            <Text style={styles.closeText}>Close Scanner</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  pinBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  pinBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    backgroundColor: '#111',
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  pinLabel: {
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 16,
  },
  qrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  qrIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 12,
  },
  qrText: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  deviceImage: {
    width: 60,
    height: 60,
    backgroundColor: '#333',
    borderRadius: 8,
    marginRight: 12,
  },
  deviceName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deviceDetail: {
    color: '#ccc',
    marginTop: 2,
  },
  label: {
    color: '#fff',
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  statusPill: {
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  active: {
    backgroundColor: 'green',
  },
  inactive: {
    backgroundColor: 'red',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  menuDots: {
    width: 16,
    height: 16,
    backgroundColor: '#555',
    borderRadius: 8,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fakeScanner: {
    width: '80%',
    height: '50%',
    backgroundColor: '#111',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerText: {
    color: '#0f0',
    fontSize: 22,
    fontWeight: 'bold',
  },
  scannerSubText: {
    color: '#aaa',
    marginTop: 10,
  },
  closeButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
  },
});
