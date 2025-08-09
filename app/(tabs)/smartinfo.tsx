// SmartInfo.tsx
import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

type AlertItem = {
  id: string;
  type: "Critical" | "Warning" | "Info";
  title: string;
  timeAgo: string;
  message: string;
  actionText: string;
  icon: string;
};

const SmartInfo = () => {
  // Mock alerts
  const alerts: AlertItem[] = [
    {
      id: "1",
      type: "Critical",
      title: "Low Soil Moisture",
      timeAgo: "15 min ago",
      message: "Soil moisture has dropped to 45%. Your crops need immediate watering to prevent stress.",
      actionText: "Start irrigation system",
      icon: "flame-outline",
    },
    {
      id: "2",
      type: "Warning",
      title: "Rain Expected",
      timeAgo: "45 min ago",
      message: "Heavy rainfall predicted in the next 6 hours. Consider covering sensitive crops.",
      actionText: "Prepare crop protection",
      icon: "cloud-outline",
    },
    {
      id: "3",
      type: "Info",
      title: "Fertilizer Recommendation",
      timeAgo: "2h ago",
      message: "Based on soil analysis, consider applying nitrogen-rich fertilizer next week.",
      actionText: "Schedule fertilizer application",
      icon: "leaf-outline",
    },
    {
      id: "4",
      type: "Warning",
      title: "High Wind Speed",
      timeAgo: "3h ago",
      message: "Strong winds expected tomorrow. Avoid spraying pesticides during this time.",
      actionText: "Reschedule spraying",
      icon: "partly-sunny-outline",
    },
    {
      id: "5",
      type: "Info",
      title: "Optimal Harvest Time",
      timeAgo: "1d ago",
      message: "Weather and soil conditions are optimal for harvesting wheat this week.",
      actionText: "Plan harvest",
      icon: "calendar-outline",
    },
    {
      id: "6",
      type: "Critical",
      title: "Pest Outbreak Risk",
      timeAgo: "2d ago",
      message: "High probability of pest outbreak detected in nearby fields.",
      actionText: "Inspect and treat crops",
      icon: "bug-outline",
    },
  ];

  // Assign colors based on type
  const getColors = (type: AlertItem["type"]) => {
    switch (type) {
      case "Critical":
        return { bg: "#b71c1c", btn: "#f44336" }; // Red
      case "Warning":
        return { bg: "#f9a825", btn: "#fbc02d" }; // Yellow
      case "Info":
        return { bg: "#2e7d32", btn: "#4caf50" }; // Green
      default:
        return { bg: "#424242", btn: "#616161" }; // Grey fallback
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Smart Info</Text>

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { bg, btn } = getColors(item.type);
          return (
            <View style={[styles.card, { backgroundColor: bg }]}>
              {/* Title Row */}
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleWrapper}>
                  <Ionicons name={item.icon} size={20} color="#fff" style={{ marginRight: 6 }} />
                  <Text style={styles.cardTitle}>
                    {item.type}: {item.title}
                  </Text>
                </View>
                <Ionicons name="volume-high" size={20} color="#fff" />
              </View>

              {/* Time */}
              <Text style={styles.timeText}>{item.timeAgo}</Text>

              {/* Message */}
              <Text style={styles.message}>{item.message}</Text>

              {/* Action Button */}
              <TouchableOpacity style={[styles.actionButton, { backgroundColor: btn }]}>
                <Text style={styles.actionText}>{item.actionText}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SmartInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 26,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: "center",
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    flexShrink: 1,
  },
  timeText: {
    color: "#f0f0f0",
    fontSize: 12,
    marginTop: 4,
  },
  message: {
    color: "#fff",
    fontSize: 14,
    marginVertical: 10,
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
