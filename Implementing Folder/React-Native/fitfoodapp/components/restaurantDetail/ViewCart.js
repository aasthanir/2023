import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import LottieView from "lottie-react-native";
import { sendOrder } from "../../api/DataApi";
import { AuthContext } from "../SignIn/Context";

export default function ViewCart({ navigation }) {
  const { userToken } = React.useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  );

  const total = items
    .map((item) => Number(item.price))
    .reduce((prev, curr) => prev + curr, 0);

  const totalCalories = items
    .map((item) => Number(item.calories))
    .reduce((prev, curr) => prev + curr, 0);
  console.log(total);

  const totalUSD = `रु ${total}`;

  const submitOrder = () => {
    setLoading(true);
    const orderDetail = items.map((item) => {
      const order = {}
      order['foodId'] = item._id
      order['quantity'] = 1
      return order
    })
    sendOrder(userToken, Date.now(), orderDetail)
      .then((response) => {
        if (!response.error) {
          setTimeout(() => {
            setLoading(false);
            navigation.navigate("OrderCompleted");
          }, 2500);
        }
        else {
          setTimeout(() => {
            setLoading(false);
          }, 2500);
        }
      });
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.7)",
    },

    modalCheckoutContainer: {
      backgroundColor: "white",
      padding: 16,
      height: 500,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      marginBottom: 10,
      color: "#000"
    },

    subtotalContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
    },

    subtotalText: {
      textAlign: "left",
      fontWeight: "600",
      fontSize: 15,
      marginBottom: 10,
      color: '#000'
    },
  });

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={{ color: "#000" }}>{totalUSD}</Text>
            </View>
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Total Calories</Text>
              <Text style={{ color: "#000" }}>{totalCalories}</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "black",
                  alignItems: "center",
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: "relative",
                }}
                onPress={() => {
                  submitOrder();
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "white", fontSize: 20 }}>Checkout</Text>
                <Text
                  style={{
                    position: "absolute",
                    right: 20,
                    color: "white",
                    fontSize: 15,
                    top: 17,
                  }}
                >
                  {total ? totalUSD : ""}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            position: "absolute",
            bottom: 470,
            left: 240,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "30%",
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 0,
                backgroundColor: "#000",
                flexDirection: "row",
                justifyContent: "center",
                padding: 15,
                borderRadius: 30,
                width: 190,
                position: "relative",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: "white", fontSize: 20, marginRight: 10 }}>
                View Cart
              </Text>
              <Text style={{ color: "white", fontSize: 20 }}>{totalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
      {loading ? (
        <View
          style={{
            backgroundColor: "black",
            position: "absolute",
            opacity: 0.6,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require("../../assets/animations/scanner.json")}
            autoPlay
            speed={3}
          />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
