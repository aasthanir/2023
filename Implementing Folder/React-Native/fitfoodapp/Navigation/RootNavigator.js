import { Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from '../components/SignIn/Context'
import { handleLogin } from '../api/Auth'
import { signUpData } from '../api/Auth';
import LoginNavigation from './LoginNavigation';
import Navigation from './Navigation';

export default function RootNavigator() {
  const [isLoggingIn, setIsLoggingIn] = useState(true);
  const [userToken, setUserToken] = useState();
  const [username, setUsername] = useState();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const authContext = React.useMemo(() => ({
    signIn: async (username, password) => {
      setIsLoggingIn(true);
      const userResponse = await handleLogin(
        username,
        password
      );
      if (userResponse.status == 200) {
        if (userResponse.data.access_token) {
          setUsername(userResponse.data.username);
          setUserToken(userResponse.data.access_token);
          Alert.alert('Logged In', 'Successfully');
          setResponseMsg("Logged in successfully!");
        }
        else {
          setResponseMsg(userResponse.data.message);
          setDialogVisible(true);
        }
      } else if (userResponse.status == "failed") {
        console.log('userResponse.message', userResponse.message)
        setResponseMsg(userResponse.message);
        setDialogVisible(true);
      }
      setIsLoggingIn(false);

    },
    signOut: () => {
      setUserToken(null);
      setResponseMsg("Logged out successfully!");
      setIsLoggingIn(false);
    },

    Register: async (name, username, password, ContactNo, email) => {
      setIsLoggingIn(true);
      const userResponse = await signUpData(
        name,
        username,
        password,
        ContactNo,
        email
      );
      if (userResponse.status == 201)
        if (userResponse !== null) {
          Alert.alert('Register Successful');
        }
        else {
          setResponseMsg(userResponse.data.message);
          setDialogVisible(true);
        }
      else if (userResponse.status == "failed") {
        console.log('userResponse.message', userResponse.message)
        setResponseMsg(userResponse.message);
        setDialogVisible(true);
      }
      setIsLoggingIn(false);

    }

  }),
    []);


  useEffect(() => {
    setTimeout(async () => {
      setIsLoggingIn(false);
    }, 1000);

  }, []);

  const hideDialog = () => {
    setDialogVisible(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authContext,
        isLoggingIn,
        responseMsg,
        userToken,
        username,
        dialogVisible,
        hideDialog,
      }}
    >
      <NavigationContainer>
        {userToken != null ? <Navigation /> : <LoginNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}