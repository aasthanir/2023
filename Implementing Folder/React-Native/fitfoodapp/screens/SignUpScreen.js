import { View, KeyboardAvoidingView, Text, StyleSheet, Button, Image, Dimensions,  Modal, TouchableOpacity, Alert } from 'react-native'
import React,  {useState, useRef, useEffect} from 'react'
import { TextInput } from 'react-native-paper';
import * as Yup from "yup";
import { Formik } from "formik";
import FlatButton from '../components/SignIn/FlatButton';
import { useTogglePasswordVisibility } from '../components/SignIn/useTogglePasswordVisibility';
import DialogBox from "../components/SignIn/DialogBox";
import { AuthContext } from '../components/SignIn/Context';
import LoadingIndicator from "../components/LoadingIndicator";

export default function SignUpScreen({navigation}) {
  const {
    authContext: {Register},
    responseMsg,
    isLoggingIn,
    dialogVisible,
    hideDialog,
  } = React.useContext(AuthContext);
  
  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useTogglePasswordVisibility();

    const validationSchema = Yup.object().shape({
		username: Yup.string().required().label("Username"),
		name: Yup.string().required().min(3).label("FullName"),
    password: Yup.string().required().min(8).label("Password"),
    ContactNo: Yup.string().required().min(10).max(10).label("ContactNo"),
    email: Yup.string().email().required().label("Email"),
	});



  return (
    <View style={styles.container}>
      <View>
        <View style={styles.logoView}>
          <Image
            style={styles.logoImg}
            source={require('../assets/logo/FitFood.png')}
          />
        </View>
        <KeyboardAvoidingView behaviour="padding" style={{marginBottom: 15}}>
          <View style={styles.formView}>
          <Text style={styles.title}> Register into FitFood </Text>
            <Formik
              initialValues={{name: '', username:'', password: '', email:'', ContactNo:''}}
              validationSchema={validationSchema}
              onSubmit={({ name, password, username, email, ContactNo }) => {
              Register(name, username, password, email, ContactNo );
						}}>

              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <View>
                  <TextInput
                    placeholder="Full Name"
                    mode="outlined"
                    theme={{
                      colors: {primary: 'grey', underlinedColor: 'transparent'},
                    }}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    style={styles.input}
                  />
                   <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errors.name}</Text>
                  </View>
                   <TextInput
                    name="Username"
                    autoCorrect={false}
                    autoCapitalize="none"
                    mode="outlined"
                    theme={{
                      colors: {primary: 'grey', underlinedColor: 'transparent'},
                    }}
                    placeholder="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    style={styles.input}
                  />
                   <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errors.username}</Text>
                  </View>
                  <TextInput
                    name="password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    mode="outlined"
                    theme={{
                      colors: {primary: 'grey', underlinedColor: 'transparent'},
                    }}
                    placeholder="Password"
                    secureTextEntry={passwordVisibility}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    style={styles.input}
                    right={
                      <TextInput.Icon
                        name={rightIcon}
                        onPress={handlePasswordVisibility}
                      />
                    }
                  />
                   <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errors.password}</Text>
                  </View>
                   <TextInput
                    placeholder="Mobile Number"
                    mode="outlined"
                    theme={{
                      colors: {primary: 'grey', underlinedColor: 'transparent'},
                    }}
                    keyboardType="numeric"
                    onChangeText={handleChange('ContactNo')}
                    onBlur={handleBlur('ContactNo')}
                    value={values.ContactNo}
                    style={styles.input}
                  />
                   <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errors.ContactNo}</Text>
                  </View>
                  <TextInput
                    name="email"
                    autoCorrect={false}
                    autoCapitalize="none"
                    mode="outlined"
                    theme={{
                      colors: {primary: 'grey', underlinedColor: 'transparent'},
                    }}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={styles.input}
                  />
                   <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{errors.email}</Text>
                  </View>
                  <FlatButton
                    title="Register"
                    handleButtonPress={handleSubmit}
                    buttonColor="green"
                    buttonLabel="Ok"
                  />

                  <View
                    style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Text style={styles.text}>Already Have an Account?</Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('SignInScreen')}>
                      <Text style={{color: 'red'}}>  Login</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View>
			{isLoggingIn && <LoadingIndicator />}
			<DialogBox
				visible={dialogVisible}
				onDismiss={hideDialog}
				responseMsg={responseMsg}
				onPress={hideDialog}
			/>
		</View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
		flex: 1,
		backgroundColor:'#EAEAED',
	},
	logoView:{
		flex: 1,
		width: windowWidth,
		marginTop: 0,
    	alignItems: 'center',
	},
	logoImg:{
		width: 205,
    	height: 155,  	
	},
	formView:{
		marginTop: 120,
		margin: 15
	},
	input: {
		marginBottom: 10,
		borderRadius: 8,
		borderColor: '#000',
		padding: 5,
		height: 40,
		backgroundColor: "#fff",
	},
  title:{
    textAlign:'center',
    marginBottom:30,
    fontSize:20,
},
    text:{
        color:'#000',
        textAlign:'center',
    },
    errorBox:{
      bottom:10,
    },
    errorText:{
      color:'red',
      marginBottom:5,
    },
})