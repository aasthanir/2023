import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ cityHandler }) {
  return (
    <View style={styles.searchbarContainer}>
      <GooglePlacesAutocomplete
        query={{ key: "AIzaSyATiAqIXBARofRD2apZcPQ1eEWZPH4fPV4" }}
        onPress={(data, details = null) => {
          console.log(data.description);
          const city = data.description.split(",")[0];
          cityHandler(city);
        }}
        // placeholder="Search"
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
            color: '#5d5d5d',
          },
          textInputContainer: {
            backgroundColor: "#eee",
            borderRadius: 50,
            flexDirection: "row",
            alignItems: "center",
            marginRight: 10,
          },
        }}
        renderLeftButton={() => (
          <View style={{ marginLeft: 10 }}>
            <Ionicons name="location-sharp" size={24} color="#000" />
          </View>
        )}
        renderRightButton={() => (
          <View
            style={{
              flexDirection: "row",
              marginRight: 8,
              backgroundColor: "#fff",
              padding: 9,
              borderRadius: 30,
              alignItems: "center",
            }}
          >
            <AntDesign
              name="clockcircle"
              size={11}
              color='#000'
              style={{ marginRight: 6 }}
            />
            <Text style={styles.recentSearch}>Search</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create(
  {
   searchbarContainer:{
       flexDirection:"row",
       marginTop: 15,
   },
   recentSearch:{
       color:"#000",
   },
  })

