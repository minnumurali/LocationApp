import moment from "moment";
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { checkHttpStat, getLocationDetails } from "../components";
import CurrentLocation from "../components/CurrentLoc";
import PreviousLocations from "../components/PreviousLoc";
import { SET_CURRENT_LOCATION, SET_LOCATION_HISTORY } from "../context/reducer";
import { useAppState, useDispatch } from "../hooks/appstate";
import { useInterval } from "../hooks/intervals";
import { getLocation, getNewLocationHistory } from "../utiles/Location";
const Home: React.FC = () => {
  const state = useAppState();
  const dispatch = useDispatch();
  const stateRef = useRef<any>(state);

  const saveCurrentLocation = async () => {
    const data = await getLocation();
    if (data) {
      const coords = {
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      };
      const locationDetails = await getLocationDetails(
        coords.latitude,
        coords.longitude
      );
      if (locationDetails.success) {
        const statusData = await checkHttpStat(locationDetails.data);
        if (statusData.success) {
          const newHistory = getNewLocationHistory(
            stateRef.current?.current,
            stateRef.current?.history
          );
          dispatch({
            type: SET_CURRENT_LOCATION,
            payload: {
              current: {
                name: locationDetails.data,
                time: moment().format("DD/MM/YYYY, hh:mm:ss"),
                coords: coords,
              },
              history: newHistory,
            },
          });
         }
         
      } 
    
    }
  };

  const removeItem = (index: number) => {
    const newHistory = state?.history.filter(
      (_: any, idx: any) => idx !== index
    );
    dispatch({
      type: SET_LOCATION_HISTORY,
      payload: newHistory,
    });
  };

  const clearAll = () => {
    dispatch({
      type: SET_LOCATION_HISTORY,
      payload: [],
    });
  };

  useInterval(() => {
    saveCurrentLocation();
  });

  useEffect(() => {
    stateRef.current = state;
  }, [state.current.time, state.history.length]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Location Manager</Text>
      <Text style={styles.subHeader}>Current Location</Text>
      <CurrentLocation data={state.current} />
      <Text style={styles.subHeader}>Previous Locations</Text>
      <PreviousLocations history={state.history} removeItem={removeItem} />
      <Button
        style={styles.button}
        labelStyle={{ color: "white", fontSize: 18 }}
        onPress={clearAll} >Clear All</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "5%",
    position: "relative",
  },
  header: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subHeader: {
    color: "#999",
    fontSize: 16,
    marginBottom: 8,
  },
  button: {
    
     bottom: "10%",
    right: "5%",
    width: "100%",
    height: "5%",
    backgroundColor: "blue",
    paddingVertical: 20,
    margin: 20,
    justifyContent:"center"
    
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    position:"relative"
  },
});

export default Home;
