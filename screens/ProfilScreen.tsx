import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../assets/profile-picture.jpg")}
        style={styles.profileImage}
      /> */}
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.bio}>
        Software Engineer | React Native Developer
      </Text>
      <Text style={styles.location}>San Francisco, CA</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: "#888",
  },
});

export default ProfileScreen;
