import { View, KeyboardAvoidingView, Text, StyleSheet, Button, Image, Dimensions,  Modal , TouchableOpacity} from 'react-native'
import React,  {useState} from 'react'
import { TextInput } from 'react-native-paper';
import * as Yup from "yup"
import { Formik } from "formik";
import FlatButton from '../components/SignIn/FlatButton';
import { useTogglePasswordVisibility } from '../components/SignIn/useTogglePasswordVisibility';
import { AuthContext } from '../components/SignIn/Context';
import DialogBox from "../components/SignIn/DialogBox";
import LoadingIndicator from "../components/LoadingIndicator";


export default function SignInScreen({navigation}) {
  
    const {
      authContext: {signIn},
      responseMsg,
      isLoggingIn,
      dialogVisible,
      hideDialog,
    } = React.useContext(AuthContext);

	const {passwordVisibility, rightIcon, handlePasswordVisibility} = useTogglePasswordVisibility();

    const validationSchema = Yup.object().shape({
		username: Yup.string().required().label("Username"),
		password: Yup.string().required().min(5).label("Password"),
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
          <Text style={styles.title}> Login into FitFood </Text>
            <Formik
              initialValues={{
                username: '',
                password: '',
              }}
              validationSchema={validationSchema}
              onSubmit={({username, password, }) => {
              signIn( username, password );
						}}>
              
              {({handleChange, handleBlur, handleSubmit, values, errors}) => (
                <View>
                  
                  <TextInput
                    placeholder="User Name"
                    mode="outlined"
                    theme={{
                      colors: {primary: 'grey', underlinedColor: 'transparent'},
                    }}
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
                    placeholder="password"
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
                  <FlatButton
                    title="Login"
                    handleButtonPress={handleSubmit}
                    buttonColor="green"
                    buttonLabel="Ok"
                  />
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
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={styles.text}>Don't Have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={{color: 'red'}}> Register</Text>
        </TouchableOpacity>
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
		marginTop: 50,
    	alignItems: 'center',
	},
	logoImg:{
		width: 205,
    	height: 155,  	
	},
	formView:{
		marginTop: 200,
		margin: 15
	},
	input: {
		marginBottom: 30,
		borderRadius: 8,
		borderColor: '#000',
		padding: 9,
		height: 40,
		backgroundColor: "#fff",
	},
	text:{
		color:'#000',
		textAlign:'center',
	},
  title:{
    textAlign:'center',
    marginBottom:40,
    fontSize:20,
},
  errorBox:{
    bottom:10,
  },
  errorText:{
    color:'red',
    marginBottom:5,
  },
})