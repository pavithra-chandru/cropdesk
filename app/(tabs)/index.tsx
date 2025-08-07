import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type IoniconName =
  | "speedometer-outline"
  | "navigate-outline"
  | "leaf-outline"
  | "water-outline"
  | "thermometer-outline"
  | "sunny-outline"
  | "rainy-outline"
  | "cloud-outline"
  | "podium-outline"
  | "rocket-outline"
  | "location-outline"
  | "notifications-outline"
  | "warning-outline"
  | "flame-outline"
  | "volume-high-outline";

type Sensor = {
  name: string;
  value: string;
  icon: IoniconName;
  color: string;
};

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<"NEST" | "SEED">("NEST");
  const [activeDot, setActiveDot] = useState(0);

  const forecast = [
    { day: "Mon", temp: "28°C", icon: "sunny-outline" },
    { day: "Tue", temp: "26°C", icon: "cloud-outline" },
    { day: "Wed", temp: "25°C", icon: "rainy-outline" },
    { day: "Thu", temp: "27°C", icon: "cloud-outline" },
    { day: "Fri", temp: "30°C", icon: "sunny-outline" },
    { day: "Sat", temp: "29°C", icon: "cloud-outline" },
    { day: "Sun", temp: "24°C", icon: "rainy-outline" },
  ];

  const sensors: Sensor[] = [
    { name: "Air Quality", value: "9%", icon: "speedometer-outline", color: "#74b9ff" },
    { name: "Wind Direction", value: "135°", icon: "navigate-outline", color: "#e17055" },
    { name: "Wind Speed", value: "14 km/h", icon: "leaf-outline", color: "#00cec9" },
    { name: "Surface Soil Moisture", value: "24%", icon: "water-outline", color: "#fd9644" },
    { name: "Root Soil Moisture", value: "30%", icon: "water-outline", color: "#6c5ce7" },
    { name: "Surface Temperature", value: "26°C", icon: "thermometer-outline", color: "#f39c12" },
    { name: "Root Temperature", value: "22°C", icon: "thermometer-outline", color: "#e84393" },
    { name: "UV Index", value: "High", icon: "sunny-outline", color: "#fab1a0" },
    { name: "Rainfall Gauge", value: "15 mm", icon: "rainy-outline", color: "#00b894" },
  ];

  const alerts = [
    {
      title: "Critical:  Low Soil Moisture",
      time: "15 min ago",
      description: "Soil moisture has dropped to 45%. Your crops need immediate watering to prevent stress.",
      button: "Start Irrigation system",
      color: "#d32f2f",
      icon: "flame-outline" as IoniconName,
    },
    {
      title: "Weather Alert:  Rain Expected",
      time: "45 min ago",
      description: "Heavy Rainfall predicted in next 6 hours. Consider covering sensitive crops.",
      button: "Prepare crop protection",
      color: "#f57c00",
      icon: "rainy-outline" as IoniconName,
    },
    {
      title: "Fertilizer Recommendation",
      time: "2h ago",
      description: "Based on soil analysis, consider applying nitrogen-rich fertilizer next week.",
      button: "Schedule fertilizer application",
      color: "#388e3c",
      icon: "leaf-outline" as IoniconName,
    },
  ];

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const screenWidth = Dimensions.get("window").width;
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setActiveDot(index);
  };

  const pageCount = Math.ceil(sensors.length / 3);

  return (
    <ScrollView style={styles.container}>
      {/* Greeting & Notification */}
      <View style={styles.headerRow}>
        <Text style={styles.greeting}>Hi! Ramesh,</Text>
        <Ionicons name="notifications-outline" size={24} color="#fff" />
      </View>

      {/* Alert */}
      <View style={styles.alertBox}>
        <Ionicons name="warning-outline" size={16} color="#fff" />
        <Text style={styles.alertText}>Alert: 50% rain by 2:00 PM</Text>
      </View>

      {/* Day Weather */}
      <Text style={styles.sectionTitle}>Day Weather</Text>
      <View style={styles.weatherCard}>
        <View style={styles.weatherHeader}>
          <Ionicons name="cloud-outline" size={48} color="#FFA500" />
          <View>
            <Text style={styles.tempText}>30°C</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="#ccc" />
              <Text style={styles.locationText}>Kattegenahalli</Text>
            </View>
          </View>
          <View style={{ flex: 1 }} />
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hourlyScroll}>
          {forecast.map((item, index) => (
            <View key={index} style={styles.hourlyItem}>
              <Ionicons name={item.icon} size={24} color="#fff" />
              <Text style={styles.hourlyTime}>{item.day}</Text>
              <Text style={styles.hourlyTemp}>{item.temp}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      {/* Toggle Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "NEST" && styles.activeTab]}
          onPress={() => setActiveTab("NEST")}
        >
          <Ionicons name="podium-outline" size={16} color={activeTab === "NEST" ? "#27ae60" : "#aaa"} />
          <Text style={[styles.tabText, activeTab === "NEST" && styles.activeTabText]}>NEST</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "SEED" && styles.activeTab]}
          onPress={() => setActiveTab("SEED")}
        >
          <Ionicons name="rocket-outline" size={16} color={activeTab === "SEED" ? "#27ae60" : "#aaa"} />
          <Text style={[styles.tabText, activeTab === "SEED" && styles.activeTabText]}>SEED</Text>
        </TouchableOpacity>
      </View>
      {/* NEST Content */}
      {activeTab === "NEST" && (
        <>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            showsHorizontalScrollIndicator={false}
            style={styles.sensorScroll}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <View
                key={pageIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: Dimensions.get("window").width,
                  paddingHorizontal: 16,
                }}
              >
                {sensors.slice(pageIndex * 3, pageIndex * 3 + 3).map((sensor, index) => (
                  <View key={index} style={styles.metricBox}>
                    <Ionicons name={sensor.icon} size={24} color={sensor.color} />
                    <Text style={styles.metricValue}>{sensor.value}</Text>
                    <Text style={styles.metricLabel}>{sensor.name}</Text>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>

          <View style={styles.dotsContainer}>
            {Array.from({ length: pageCount }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  { backgroundColor: activeDot === i ? "#0f0" : "#555" },
                ]}
              />
            ))}
          </View>
        </>
      )}

      {/* SEED Content */}
      {activeTab === "SEED" && (
        <View style={styles.seedContent}>
          <Text style={styles.sectionTitle}>Checkpoint Analysis</Text>
          <View style={styles.calendar}>
            {[[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25],].map((week, i) => (
              <View key={i} style={styles.calendarRow}>
                {week.map((day) => (
                  <View
                    key={day}
                    style={[styles.calendarCell, [1, 7, 13, 17, 25].includes(day) && styles.calendarCellActive]}
                  >
                    <Text
                      style={[styles.calendarCellText, [1, 7, 13, 17, 25].includes(day) && styles.calendarCellTextActive]}
                    >
                      {day}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </View>
      )}
      {/* Alerts */}
      {activeTab === "NEST" && alerts.map((alert, index) => (
        <View key={index} style={[styles.alertCard, { backgroundColor: alert.color }]}>
          <View style={styles.alertHeader}>
            <Ionicons name={alert.icon} size={20} color="#fff" />
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <View style={{ flex: 1 }} />
            <Ionicons name="volume-high-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.alertTime}>{alert.time}</Text>
          <Text style={styles.alertDescription}>{alert.description}</Text>
          <TouchableOpacity style={styles.alertButton}>
            <Text style={styles.alertButtonText}>{alert.button}</Text>
          </TouchableOpacity>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ...your previous styles...
  container: { flex: 1, backgroundColor: "#111", paddingTop: 48 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16 },
  greeting: { color: "#fff", fontSize: 20, fontWeight: "600" },
  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 46,
    marginTop: 16,
    alignSelf: "center",
  },
  alertText: { color: "#fff", fontSize: 12, marginLeft: 6 },
  sectionTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginTop: 24, marginBottom: 8, paddingHorizontal: 16 },
  weatherCard: { backgroundColor: "#222", borderRadius: 16, padding: 16, marginHorizontal: 16 },
  weatherHeader: { flexDirection: "row", alignItems: "center" },
  tempText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  locationText: { color: "#ccc", fontSize: 12, marginLeft: 4 },
  dateText: { color: "#ccc", fontSize: 12 },
  hourlyScroll: { marginTop: 12 },
  hourlyItem: { backgroundColor: "#333", borderRadius: 12, padding: 10, alignItems: "center", marginRight: 8, width: 60 },
  hourlyTime: { color: "#fff", fontSize: 12, marginTop: 4 },
  hourlyTemp: { color: "#fff", fontSize: 12 },
  alertCard: { borderRadius: 16, padding: 16, marginHorizontal: 16, marginTop: 16 },
  alertHeader: { flexDirection: "row", alignItems: "center" },
  alertTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  alertTime: { color: "#fff", fontSize: 12, marginTop: 4 },
  alertDescription: { color: "#fff", fontSize: 14, marginTop: 8 },
  alertButton: { backgroundColor: "#fff", paddingVertical: 10, borderRadius: 8, marginTop: 12, alignItems: "center" },
  alertButtonText: { color: "#000", fontWeight: "bold" },
  tabContainer: { flexDirection: "row", backgroundColor: "#222", borderRadius: 30, overflow: "hidden", alignSelf: "center", marginTop: 24 },
  tab: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 20 },
  tabText: { color: "#aaa", fontSize: 14, marginLeft: 6 },
  activeTab: { backgroundColor: "#333" },
  activeTabText: { color: "#fff", fontWeight: "600" },
  sensorScroll: { marginTop: 12 },
  metricBox: { backgroundColor: "#222", borderRadius: 12, padding: 16, alignItems: "center", width: 100 },
  metricValue: { color: "#fff", fontSize: 16, fontWeight: "600", marginTop: 6 },
  metricLabel: { color: "#ccc", fontSize: 10, textAlign: "center", marginTop: 4 },
  dotsContainer: { flexDirection: "row", justifyContent: "center", marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#555", marginHorizontal: 4 },
  seedContent: { paddingHorizontal: 16, marginTop: 16 },
  calendar: { backgroundColor: "#222", borderRadius: 16, padding: 16 },
  calendarRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  calendarCell: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#333", alignItems: "center", justifyContent: "center" },
  calendarCellActive: { backgroundColor: "#f44336" },
  calendarCellText: { color: "#fff", fontSize: 14 },
  calendarCellTextActive: { fontWeight: "bold" },
});

