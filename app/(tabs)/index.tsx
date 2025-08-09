import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SensorData = {
  name: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
};

const API_URL =
  "https://cropnowfunctionofiot-cvhne5esfxhea6es.canadacentral-01.azurewebsites.net/api/HttpTrigger1?code=TFy56B9wIpVV7pilaiKEi3fn8LfU9rQ02HGG529zexB0AzFuHa7nmw==";

export default function Index() {
  const [sensors, setSensors] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Format data assuming API returns a similar structure
        const formatted: SensorData[] = data?.map((item: any) => ({
          name: item?.name || "Sensor",
          value: item?.value || "-",
          icon: (item?.icon as keyof typeof Ionicons.glyphMap) || "speedometer-outline",
          color: item?.color || "#00b894",
        }));

        setSensors(formatted);
      } catch (err) {
        setError("Failed to fetch sensor data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00b894" />
        <Text style={styles.loadingText}>Fetching sensor data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Live Sensor Dashboard</Text>
      {sensors.map((sensor, index) => (
        <View key={index} style={[styles.card, { borderColor: sensor.color }]}>
          <Ionicons name={sensor.icon} size={28} color={sensor.color} />
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardName}>{sensor.name}</Text>
            <Text style={styles.cardValue}>{sensor.value}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: "#111",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  cardTextContainer: {
    marginLeft: 12,
  },
  cardName: {
    fontSize: 16,
    color: "#fff",
  },
  cardValue: {
    fontSize: 14,
    color: "#ccc",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 20,
  },
  loadingText: {
    color: "#ccc",
    marginTop: 8,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
