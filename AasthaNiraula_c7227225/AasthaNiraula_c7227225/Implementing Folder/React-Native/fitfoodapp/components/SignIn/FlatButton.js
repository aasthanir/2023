import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { color } from 'react-native-reanimated';

export default function FlatButton({buttonLabel, handleButtonPress}) {
  return (
    <TouchableOpacity  onPress={handleButtonPress}>
			<View style={[styles.button, { backgroundColor: 'green'  }]}>
				<Text style={styles.buttonText}>{buttonLabel}</Text>
			</View>
		</TouchableOpacity>
  )
}


const styles = StyleSheet.create({
	button: {
		borderRadius: 30,
		width: "50%",
		paddingVertical: 15,
		alignSelf: "center",
		marginBottom: 20,
	},
	buttonText: {
		color: "#fff",
		fontSize: 17,
		textAlign: "center",
		textTransform: "uppercase",
		fontWeight:'bold',
	},
});

