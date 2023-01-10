import { View, Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntDesign from "react-native-vector-icons/AntDesign";
import { AuthContext} from '../SignIn/Context';


export default function Header() {
  const {
    authContext: {signOut},
  } = React.useContext(AuthContext);
  return (
    <View>
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/FitFood.png')}
      />
      </View>
      <View>
      <TouchableOpacity onPress={signOut} style={{alignSelf:'flex-end' , flexDirection:'row'}}>
      <AntDesign
              name="logout"
              size={21}
              color='red'
              style={{ marginLeft:10, fontWeight:'bold'}}
            /><Text style={{color:"red", fontWeight:'bold'}}>  Logout</Text>  
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
        width:'100%',
        height:50,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
      },
      logo:{
        width:180,
        height :250,
        resizeMode:'contain',
      },
})