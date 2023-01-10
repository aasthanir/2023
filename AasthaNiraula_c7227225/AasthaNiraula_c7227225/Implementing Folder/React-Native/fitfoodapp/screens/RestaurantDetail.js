import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Divider } from "react-native-elements";
import { getMenuItem } from "../api/DataApi";
import LoadingIndicator from "../components/LoadingIndicator";
import About from "../components/restaurantDetail/About";
import MenuItems from "../components/restaurantDetail/MenuItems";
import ViewCart from "../components/restaurantDetail/ViewCart";
import { AuthContext } from "../components/SignIn/Context";

foods = [
];

export default function RestaurantDetail({ route, navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [isLoading, setLoadingState] = useState(true);
  const resturantMenu = async () => {
    const {data, status} = await getMenuItem(userToken);
    if(status == 200)
    {
      foods = data
    }
    setLoadingState(false);
  }

  useEffect(() => {
    resturantMenu()
  }, [])

  return isLoading ? <LoadingIndicator /> : (
    <View style={{ flex: 1, }}>
      <About route={route} />
      <ViewCart navigation={navigation} />
      <Divider width={1.8} style={{ marginVertical: 20 }} />
      <MenuItems restaurantName={route.params.name} foods={foods} />
    </View>
  );
}
