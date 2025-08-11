import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
  | "compass-outline"
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
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState<
    {
      title: string;
      time: string;
      description: string;
      button: string;
      color: string;
      icon: IoniconName;
    }[]
  >([]);

  const forecast = [
    { day: "Mon", temp: "28°C", icon: "sunny-outline" },
    { day: "Tue", temp: "26°C", icon: "cloud-outline" },
    { day: "Wed", temp: "25°C", icon: "rainy-outline" },
    { day: "Thu", temp: "27°C", icon: "cloud-outline" },
    { day: "Fri", temp: "30°C", icon: "sunny-outline" },
    { day: "Sat", temp: "29°C", icon: "cloud-outline" },
    { day: "Sun", temp: "24°C", icon: "rainy-outline" },
  ];

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://cropnowfunctionofiot-cvhne5esfxhea6es.canadacentral-01.azurewebsites.net/api/HttpTrigger1?code=TFy56B9wIpVV7pilaiKEi3fn8LfU9rQ02HGG529zexB0AzFuHa7nmw=="
      );
      const data = await res.json();

      const sensorData: Sensor[] = [
        {
          name: "Air Quality",
          value: data.air_quality !== null ? `${data.air_quality}%` : "--",
          icon: "speedometer-outline",
          color: "#74b9ff",
        },
        {
          name: "Soil Moisture 1",
          value:
            data.soil_moisture_1 !== null ? `${data.soil_moisture_1}%` : "--",
          icon: "water-outline",
          color: "#81ecec",
        },
        {
          name: "Soil Moisture 2",
          value:
            data.soil_moisture_2 !== null ? `${data.soil_moisture_2}%` : "--",
          icon: "water-outline",
          color: "#00cec9",
        },
        {
          name: "Root Temperature",
          value:
            data.temperature_1 !== null ? `${data.temperature_1}°C` : "--",
          icon: "thermometer-outline",
          color: "#ff7675",
        },
        {
          name: "Surface Temperature",
          value:
            data.temperature_2 !== null ? `${data.temperature_2}°C` : "--",
          icon: "thermometer-outline",
          color: "#fab1a0",
        },
        {
          name: "UV Index",
          value: data.uv_index !== null ? `${data.uv_index}` : "--",
          icon: "sunny-outline",
          color: "#ffeaa7",
        },
        {
          name: "Wind Speed",
          value: data.wind_speed !== null ? `${data.wind_speed} m/s` : "--",
          icon: "navigate-outline",
          color: "#a29bfe",
        },
        {
          name: "Rainfall",
          value: data.rain_ticks !== null ? `${data.rain_ticks} mm` : "--",
          icon: "rainy-outline",
          color: "#74b9ff",
        },
        {
          name: "Wind Dir.",
          value:
            data.wind_direction !== null ? `${data.wind_direction}°` : "--",
          icon: "compass-outline",
          color: "#55efc4",
        },
      ];

      setSensors(sensorData);

      const generatedAlerts: typeof alerts = [];
      const now = new Date();
      const timeLabel = `${now.getHours()}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      if (data.soil_moisture_1 !== null && data.soil_moisture_1 < 30) {
        generatedAlerts.push({
          title: "Critical: Low Soil Moisture",
          time: timeLabel,
          description: `Soil moisture is ${data.soil_moisture_1}%. Your crops need immediate irrigation.`,
          button: "Start Irrigation System",
          color: "#d32f2f",
          icon: "flame-outline",
        });
      }

      if (data.uv_index !== null && data.uv_index > 7) {
        generatedAlerts.push({
          title: "High UV Index",
          time: timeLabel,
          description: `UV Index is ${data.uv_index}. Cover sensitive crops.`,
          button: "Add UV Protection",
          color: "#f57c00",
          icon: "sunny-outline",
        });
      }

      if (data.rain_ticks !== null && data.rain_ticks > 15) {
        generatedAlerts.push({
          title: "Heavy Rainfall Detected",
          time: timeLabel,
          description: `Rainfall is ${data.rain_ticks} mm. Flooding risk possible.`,
          button: "Check Drainage",
          color: "#1976d2",
          icon: "rainy-outline",
        });
      }

      if (data.air_quality !== null && data.air_quality < 40) {
        generatedAlerts.push({
          title: "Poor Air Quality",
          time: timeLabel,
          description: `Air quality dropped to ${data.air_quality}%. Sensitive crops may be affected.`,
          button: "Install Air Filter",
          color: "#6a1b9a",
          icon: "speedometer-outline",
        });
      }

      setAlerts(generatedAlerts);
    } catch (error) {
      console.error("Failed to fetch sensor data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

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
    <View style={{ flex: 1, paddingTop: 40, paddingBottom: 10 }}>
      <ScrollView>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.greeting}>Hi! Ramesh,</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={fetchSensorData} style={{ marginRight: 16 }}>
              <Ionicons name="refresh-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </View>
        </View>

        {/* Static Alert Box */}
        <View style={styles.alertBox}>
          <Ionicons name="warning-outline" size={16} color="#fff" />
          <Text style={styles.alertText}>Alert: 50% rain by 2:00 PM</Text>
        </View>

        {/* Weather Section */}
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.hourlyScroll}
          >
            {forecast.map((item, index) => (
              <View key={index} style={styles.hourlyItem}>
                <Ionicons name={item.icon as IoniconName} size={24} color="#fff" />
                <Text style={styles.hourlyTime}>{item.day}</Text>
                <Text style={styles.hourlyTemp}>{item.temp}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["NEST", "SEED"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab as "NEST" | "SEED")}
            >
              <Ionicons
                name={tab === "NEST" ? "podium-outline" : "rocket-outline"}
                size={16}
                color={activeTab === tab ? "#27ae60" : "#aaa"}
              />
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* NEST Sensor Grid */}
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
                    gap: 15,
                    width: Dimensions.get("window").width,
                    paddingHorizontal: 30,
                  }}
                >
                  {sensors
                    .slice(pageIndex * 3, pageIndex * 3 + 3)
                    .map((sensor, index) => (
                      <View key={index} style={styles.metricBox}>
                        <Ionicons
                          name={sensor.icon}
                          size={34}
                          color={sensor.color}
                        />
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

            {/* 🔔 Dynamic Alerts */}
            {alerts.map((alert, index) => (
              <View
                key={index}
                style={[styles.alertCard, { backgroundColor: alert.color }]}
              >
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
          </>
        )}

        {/* SEED Calendar */}
        {activeTab === "SEED" && (
          <View style={styles.seedContent}>
            <Text style={styles.sectionTitle}>Checkpoint Analysis</Text>
            <View style={styles.calendar}>
              {[
                [1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25],
              ].map((week, i) => (
                <View key={i} style={styles.calendarRow}>
                  {week.map((day) => (
                    <View
                      key={day}
                      style={[
                        styles.calendarCell,
                        [1, 7, 13, 17, 25].includes(day) &&
                          styles.calendarCellActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.calendarCellText,
                          [1, 7, 13, 17, 25].includes(day) &&
                            styles.calendarCellTextActive,
                        ]}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
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
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  weatherCard: {
    backgroundColor: "#222",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
  },
  weatherHeader: { flexDirection: "row", alignItems: "center" },
  tempText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  locationRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  locationText: { color: "#ccc", fontSize: 12, marginLeft: 4 },
  dateText: { color: "#ccc", fontSize: 12 },
  hourlyScroll: { marginTop: 12 },
  hourlyItem: {
    backgroundColor: "#333",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginRight: 8,
    width: 60,
  },
  hourlyTime: { color: "#fff", fontSize: 12, marginTop: 4 },
  hourlyTemp: { color: "#fff", fontSize: 12 },
  alertCard: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  alertHeader: { flexDirection: "row", alignItems: "center" },
  alertTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  alertTime: { color: "#fff", fontSize: 12, marginTop: 4 },
  alertDescription: { color: "#fff", fontSize: 14, marginTop: 8 },
  alertButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: "center",
  },
  alertButtonText: { color: "#000", fontWeight: "bold" },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#222",
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    marginTop: 24,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  tabText: { color: "#aaa", fontSize: 14, marginLeft: 6 },
  activeTab: { backgroundColor: "#333" },
  activeTabText: { color: "#fff", fontWeight: "600" },
  sensorScroll: { marginTop: 12 },
  metricBox: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    width: 100,
  },
  metricValue: { color: "#fff", fontSize: 14, fontWeight: "600", marginTop: 6 },
  metricLabel: {
    color: "#ccc",
    fontSize: 15,
    textAlign: "center",
    marginTop: 4,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#555",
    marginHorizontal: 4,
  },
  seedContent: { paddingHorizontal: 16, marginTop: 16 },
  calendar: { backgroundColor: "#222", borderRadius: 16, padding: 16 },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calendarCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarCellActive: { backgroundColor: "#f44336" },
  calendarCellText: { color: "#fff", fontSize: 14 },
  calendarCellTextActive: { fontWeight: "bold" },
});
