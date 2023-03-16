import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  Dimensions,
  StyleSheet,
  View,
  Modal,
  Text,
  Button,
} from "react-native";
import ScooterMarker from "../components/ScooterMarker";
import Constants from "expo-constants";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const initial_location = {
  latitude: 32.29496475761959,
  longitude: -9.234702467931514,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function App() {
  const [selectedScooter, setSelectedScooter] = useState(null);
  const [id, setId] = useState(null);
  const apiUrl = Constants.expoConfig.extra.apiUrl;

  const rentScooter = () => {
    axios
      .put(`${apiUrl}/user/rent/${id}`)
      .then((res) => {
        setSelectedScooter(res.data);
        alert("Scooter rented");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initial_location}>
        <ScooterMarker onScooterPress={setSelectedScooter} storeId={setId} />
      </MapView>
      <View style={styles.centeredView}>
        <Modal animationType={"fade"} visible={selectedScooter !== null}>
          {selectedScooter !== null && (
            <View style={styles.centeredView}>
              <Text style={styles.modalText}>
                Scooter Brands: {selectedScooter.model}
              </Text>
              <Text style={styles.modalText}>
                Battery: {selectedScooter.battery}
              </Text>
              <Text style={styles.modalText}>
                Price: {selectedScooter.price}
              </Text>
              <Text style={styles.modalText}>
                Status: {selectedScooter.isRented}
              </Text>
              <View style={styles.buttonContainers}>
                {selectedScooter.isRented === "Not Rented" ? (
                  <Text
                    style={{
                      paddingRight: 10,
                    }}
                  >
                    <Button
                      color={"green"}
                      title="Rent"
                      onPress={rentScooter}
                    />
                  </Text>
                ) : (
                  // <Text
                  //   style={{
                  //     paddingRight: 10,
                  //   }}
                  // >
                  //   <Button
                  //     color={"red"}
                  //     title="Return"
                  //     onPress={rentScooter}
                  //   />
                  // </Text>
                  <View></View>
                )}
                <Button
                  color="#E91E63"
                  style={{ marginLeft: 10 }}
                  title="Close"
                  onPress={() => {
                    setSelectedScooter(null), setId(null);
                  }}
                />
              </View>
            </View>
          )}
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  // modals:{
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor : "#00BCD4",
  //   height: 300 ,
  //   width: '80%',
  //   borderRadius:10,
  //   borderWidth: 1,
  //   borderColor: '#fff',
  //   marginTop: 80,
  //   marginLeft: 40,
  // },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "red",
  },
  // scooterInfo: {
  //   backgroundColor: "white",
  //   padding: 20,
  //   borderRadius: 10,
  //   margin: 20,
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainers: {
    flexDirection: "row",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
