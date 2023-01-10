import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { color } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const localRestaurants = [
  {
    name: "Jimbu Thakali",
    image_url:
      "https://lh5.googleusercontent.com/p/AF1QipPhuAQK8qD2YegnzRGslT0-KgQCOoxmbJpx1NM=w1080-k-no",
    categories: ["Cafe", "Bar"],
    price: "$$",
    reviews: 1244,
    rating: 4.5,
  },
  {
    name: "Makoo Bakery",
    image_url:
      "https://lh3.googleusercontent.com/p/AF1QipNUgg616O-RYDN_jmRGQ6C7LuNHbuVDykSO2p6n=s1600-w400",
    categories: ["Cafe", "Bakery"],
    price: "$$",
    reviews: 1244,
    rating: 3.7,
  },
  {
    name: "White Rabbit KTM",
    image_url:
      "https://i.ytimg.com/vi/-cqudtzq5sw/maxresdefault.jpg",
    categories: ["Indian", "Bar"],
    price: "$$",
    reviews: 700,
    rating: 4.9,
  },
];

export default function RestaurantItems({ navigation, ...props }) {
  return (
    <>
      {props.restaurantData.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate("RestaurantDetail", {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              rating: restaurant.rating,
              categories: restaurant.categories,
            })
          }
        >
          <View
            style={{ marginTop: 10, padding: 15, backgroundColor: "white" }}
          >
            <RestaurantImage image={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const RestaurantImage = (props) => (
  <>
    <Image
      source={{
        uri: props.image,
      }}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
);

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold", color:"#000" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#5F9EA0",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text style={{color:'#fff'}}>{props.rating}</Text>
    </View>
  </View>
);
