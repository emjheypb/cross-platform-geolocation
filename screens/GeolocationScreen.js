import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";

// TODO: Import location library
import * as Location from "expo-location";

export default function GeolocationScreen() {
  // state variables for location
  const [cityFromUI, setCityFromUI] = useState(
    "165 Kendal Avenue, Toronto, Ontario"
  );
  const [latFromUI, setLatFromUI] = useState("43.676410");
  const [lngFromUI, setLngFromUI] = useState("-79.410150");

  // state variables to store results of geocoding
  const [deviceLocation, setDeviceLocation] = useState(null);
  const [currAddress, setCurrAddress] = useState(null);
  const [geocodedCoordinates, setGeocodedCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  // helper function to get device location
  const getCurrentLocation = async () => {
    // alert("Getting current location...");
    try {
      // 1. get permissions
      Location.requestForegroundPermissionsAsync()
        // 2. if permission granted, then get the location
        .then((result) => {
          console.log("getCurrentLocation", result.status);
          if (result.status === "granted") {
            return Location.getCurrentPositionAsync();
          } else {
            throw new Error("Edit Location Permission");
          }
        })
        // 3. do something with the retreived location
        .then((location) => {
          console.log(JSON.stringify(location));
          setDeviceLocation(location);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // helper function to do reverse geocoding (coordinates to address)
  const doReverseGeocode = () => {
    try {
      // 0. on android, permissions must be granted
      Location.requestForegroundPermissionsAsync()
        // 1. do geocoding
        .then((result) => {
          console.log("doReverseGeocode", result.status);
          if (result.status === "granted") {
            return Location.reverseGeocodeAsync({
              latitude: Number(latFromUI),
              longitude: Number(lngFromUI),
            });
          } else {
            throw new Error("Edit Location Permission");
          }
        })
        // 2. check if result found
        .then((location) => {
          console.log("doReverseGeocode", JSON.stringify(location));
          setCurrAddress(
            `${location[0].name}, ${location[0].streetNumber} ${location[0].street}, ${location[0].city}, ${location[0].region}, ${location[0].postalCode}`
          );
        });
      // 3. do something with results
    } catch (err) {
      console.log(err);
    }
  };

  // helper function to do forward geocoding (address to coordinates)
  const doForwardGeocode = async () => {
    try {
      // 0. on android, permissions must be granted
      Location.requestForegroundPermissionsAsync()
        // 1. do geocoding setCityFromUI
        .then((result) => {
          console.log("doForwardGeocode", result.status);
          if (result.status === "granted") {
            return Location.geocodeAsync(cityFromUI);
          } else {
            throw new Error("Edit Location Permission");
          }
        })
        // 2. Check if a result is found
        .then((location) => {
          console.log("doForwardGeocode", JSON.stringify(location));
          setGeocodedCoordinates(location[0]);
        });
      // 3. do something with results
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Pressable style={styles.btn} onPress={getCurrentLocation}>
        <Text style={styles.btnLabel}>Get Current Location</Text>
      </Pressable>
      <Text>Your location is {JSON.stringify(deviceLocation)}</Text>

      {deviceLocation !== null && (
        <View style={{ marginVertical: 10 }}>
          <Text>
            Device latitude:
            <Text style={{ color: "blue" }}>
              {deviceLocation.coords.latitude}
            </Text>
          </Text>
          <Text>
            Device longitude:
            <Text style={{ color: "blue" }}>
              {deviceLocation.coords.longitude}
            </Text>
          </Text>
        </View>
      )}

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
        Reverse Gecoding
      </Text>
      <TextInput
        style={styles.tb}
        keyboardType="numeric"
        value={latFromUI}
        onChangeText={setLatFromUI}
        placeholder="Enter latitude"
      />
      <TextInput
        style={styles.tb}
        keyboardType="numeric"
        value={lngFromUI}
        onChangeText={setLngFromUI}
        placeholder="Enter longitude"
      />
      <Pressable onPress={doReverseGeocode} style={styles.btn}>
        <Text style={styles.btnLabel}>Do Reverse Geocode</Text>
      </Pressable>

      <View style={{ marginVertical: 10 }}>
        <Text>
          Street Address:
          <Text style={{ color: "blue" }}>{currAddress}</Text>
        </Text>
      </View>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20 }}>
        Forward Geocoding
      </Text>
      <TextInput
        style={styles.tb}
        value={cityFromUI}
        onChangeText={setCityFromUI}
        placeholder="Enter address"
      />

      <Pressable onPress={doForwardGeocode} style={styles.btn}>
        <Text style={styles.btnLabel}>Get Coordinates</Text>
      </Pressable>

      <View style={{ marginVertical: 10 }}>
        <Text>
          Longitude
          <Text style={{ color: "blue" }}>{geocodedCoordinates.latitude}</Text>
        </Text>
        <Text>
          Longitude:
          <Text style={{ color: "blue" }}>{geocodedCoordinates.longitude}</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#141D21",
    borderRadius: 8,
    paddingVertical: 16,
    marginVertical: 10,
  },
  btnLabel: {
    fontSize: 16,
    textAlign: "center",
  },
  tb: {
    width: "100%",
    borderRadius: 5,
    backgroundColor: "#efefef",
    color: "#333",
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 10,
  },
});
