import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"NEST" | "SEED">("NEST");

  const forecast = Array(6).fill({
    time: "21:00",
    temp: "25°C",
    icon: "partly-sunny-outline",
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.greeting}>Hi! Ramesh,</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      {/* Alert */}
      <View style={styles.alertBox}>
        <Ionicons name="warning-outline" size={16} color="#fff" />
        <Text style={styles.alertText}>Alert 50% rain by 2:00 PM</Text>
      </View>

      {/* Today's Weather */}
      <Text style={styles.sectionTitle}>Today's Weather</Text>
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Ionicons name="partly-sunny" size={48} color="#FFA500" />
          <View>
            <Text style={styles.tempText}>30°C</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#ccc" />
              <Text style={styles.locationText}>Kattegenahalli</Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.dateText}>wed, 26 June</Text>
        </View>

        {/* Hourly Forecast */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
          {forecast.map((item, index) => (
            <View key={index} style={styles.hourlyItem}>
              <Ionicons name={item.icon} size={20} color="#fff" />
              <Text style={styles.hourlyTime}>{item.time}</Text>
              <Text style={styles.hourlyTemp}>{item.temp}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "NEST" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("NEST")}
        >
          <Ionicons name="hardware-chip-outline" size={16} color={activeTab === "NEST" ? "#000" : "#fff"} />
          <Text style={[styles.tabText, activeTab === "NEST" && styles.activeTabText]}>NEST-0F77</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "SEED" && styles.activeTabButton,
          ]}
          onPress={() => setActiveTab("SEED")}
        >
          <Text style={[styles.tabText, activeTab === "SEED" && styles.activeTabText]}>SEED</Text>
        </TouchableOpacity>
      </View>

      {/* Metrics */}
      <View style={styles.metricsRow}>
        <View style={styles.metricBox}>
          <Ionicons name="speedometer-outline" size={20} color="#74b9ff" />
          <Text style={styles.metricValue}>9%</Text>
          <Text style={styles.metricLabel}>Air Quality</Text>
        </View>
        <View style={styles.metricBox}>
          <Ionicons name="navigate-outline" size={20} color="#e17055" />
          <Text style={styles.metricValue}>135°C</Text>
          <Text style={styles.metricLabel}>Wind Direction</Text>
        </View>
        <View style={styles.metricBox}>
          <Ionicons name="water-outline" size={20} color="#fd9644" />
          <Text style={styles.metricValue}>21°C</Text>
          <Text style={styles.metricLabel}>Soil Moisture</Text>
        </View>
        <View style={styles.metricBox}>
          <Ionicons name="thermometer-outline" size={20} color="#f39c12" />
          <Text style={styles.metricValue}>21°C</Text>
          <Text style={styles.metricLabel}>Temperature</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 16,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  alertText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 6,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
  },
  weatherCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },
  weatherHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  tempText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationText: {
    color: "#ccc",
    fontSize: 12,
    marginLeft: 4,
  },
  dateText: {
    color: "#ccc",
    fontSize: 12,
  },
  hourlyScroll: {
    marginTop: 12,
  },
  hourlyItem: {
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginRight: 8,
    width: 60,
  },
  hourlyTime: {
    color: "#fff",
    fontSize: 10,
    marginTop: 4,
  },
  hourlyTemp: {
    color: "#fff",
    fontSize: 12,
  },
  tabRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  tabButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  activeTabButton: {
    backgroundColor: "#fff",
  },
  tabText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 6,
  },
  activeTabText: {
    color: "#000",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  metricBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  metricValue: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  metricLabel: {
    color: "#ccc",
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },
});
