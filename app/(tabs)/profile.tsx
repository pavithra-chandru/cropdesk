import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const ProfileSection: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [language] = useState<'English' | 'Hindi'>('English');
  const [dataRefreshInterval] = useState('30 Seconds');

  // Profile states
  const [name, setName] = useState('Ramesh');
  const [mobile, setMobile] = useState('+91 1234567892');
  const [email, setEmail] = useState('ramesh@example.com');
  const [location, setLocation] = useState('Kolar');
  const [dob, setDob] = useState('01/01/1990');
  const [occupation, setOccupation] = useState('Farmer');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  const [editMode, setEditMode] = useState(false);

  // Support & Help modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string }>({
    title: '',
    content: ''
  });

  const openModal = (title: string, content: string) => {
    setModalContent({ title, content });
    setModalVisible(true);
  };

  const validateAndSave = () => {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(mobile)) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid mobile number.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setEditMode(false);
    Alert.alert('Profile Updated', 'Your profile details have been saved.');
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.center}>
          <Text style={styles.header}>Profile & Settings</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person-circle-outline" size={60} color="#aaa" />
          </View>

          {editMode ? (
            <View style={styles.profileInfo}>
              <Text style={styles.editLabel}>Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} />

              <Text style={styles.editLabel}>Mobile Number</Text>
              <TextInput style={styles.input} value={mobile} onChangeText={setMobile} keyboardType="phone-pad" />

              <Text style={styles.editLabel}>Email</Text>
              <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />

              <Text style={styles.editLabel}>Location</Text>
              <TextInput style={styles.input} value={location} onChangeText={setLocation} />

              <Text style={styles.editLabel}>Date of Birth</Text>
              <TextInput style={styles.input} value={dob} onChangeText={setDob} />

              <Text style={styles.editLabel}>Occupation</Text>
              <TextInput style={styles.input} value={occupation} onChangeText={setOccupation} />

              <Text style={styles.editLabel}>Gender</Text>
              <TextInput style={styles.input} value={gender} onChangeText={(val) => setGender(val as any)} />
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.subText}>{mobile}</Text>
              <Text style={styles.subText}>{email}</Text>
              <Text style={styles.subText}>📍 {location}</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => (editMode ? validateAndSave() : setEditMode(true))}>
            {editMode ? (
              <Ionicons name="checkmark-outline" size={22} color="#0f0" />
            ) : (
              <Feather name="edit" size={20} color="#aaa" />
            )}
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconLabel}>
              <Ionicons name="notifications-outline" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.label}>Notifications</Text>
            </View>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
          </View>

          <View style={styles.row}>
            <View style={styles.iconLabel}>
              <Ionicons name="language-outline" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.label}>Language</Text>
            </View>
            <Text style={styles.badge}>{language}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.iconLabel}>
              <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.label}>Email Notifications</Text>
            </View>
            <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
          </View>

          <View style={styles.row}>
            <View style={styles.iconLabel}>
              <Feather name="refresh-ccw" size={20} color="#fff" style={styles.icon} />
              <Text style={styles.label}>Data Refresh</Text>
            </View>
            <Text style={styles.badge}>{dataRefreshInterval}</Text>
          </View>
        </View>

        {/* Support & Help */}
        <Text style={styles.sectionTitle}>Support & Help</Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.helpRow}
            onPress={() =>
              openModal(
                'Help Center',
                'Frequently Asked Questions:\n\n1. How to reset my password?\n→ Go to Settings > Reset Password.\n\n2. How to contact support?\n→ Email us at cropnow.contact.com.'
              )
            }
          >
            <Ionicons name="help-circle-outline" size={20} color="#ccc" style={styles.helpIcon} />
            <Text style={styles.helpText}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpRow}
            onPress={() =>
              openModal(
                'Contact Support',
                'You can reach us at:\n\n📞 +91 9141749525 \n📧 cropnow.contact.com\n\nAvailable: Mon-Fri, 9 AM - 6 PM'
              )
            }
          >
            <Ionicons name="call-outline" size={20} color="#ccc" style={styles.helpIcon} />
            <Text style={styles.helpText}>Contact Support</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpRow}
            onPress={() =>
              openModal(
                'Training Resources',
                'Training Videos:\n\nWe will update soon.'
              )
            }
          >
            <Ionicons name="book-outline" size={20} color="#ccc" style={styles.helpIcon} />
            <Text style={styles.helpText}>Training Resources</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.helpRow}
            onPress={() =>
              openModal(
                'Export Data',
                'Your data export has started.\n\nYou will receive an email once the export is ready for download.'
              )
            }
          >
            <Ionicons name="download-outline" size={20} color="#ccc" style={styles.helpIcon} />
            <Text style={styles.helpText}>Export Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalContent.title}</Text>
            <ScrollView>
              <Text style={styles.modalText}>{modalContent.content}</Text>
            </ScrollView>
            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scrollContent: { padding: 16, paddingBottom: 40, paddingTop: 50 },
  center: { alignItems: 'center', marginBottom: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: { marginRight: 16 },
  profileInfo: { flex: 1 },
  name: { fontSize: 18, fontWeight: '600', color: '#fff' },
  subText: { fontSize: 14, color: '#aaa', marginTop: 2 },
  input: {
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 10,
    height: 40,
  },
  editLabel: {
    color: '#bbb',
    fontSize: 13,
    marginBottom: 4,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 10 },
  card: { backgroundColor: '#1f1f1f', borderRadius: 12, padding: 16, marginBottom: 24 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 },
  iconLabel: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 10 },
  label: { fontSize: 16, color: '#fff' },
  badge: { backgroundColor: '#333', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 10, fontSize: 14, color: '#fff' },
  helpRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
  helpIcon: { marginRight: 12 },
  helpText: { fontSize: 16, color: '#ccc' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1f1f1f', borderRadius: 12, padding: 20, width: '100%', maxHeight: '80%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  modalText: { fontSize: 15, color: '#ccc', lineHeight: 22 },
  modalButton: { backgroundColor: '#333', paddingVertical: 10, borderRadius: 8, marginTop: 15, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontSize: 16 },
});

export default ProfileSection;
