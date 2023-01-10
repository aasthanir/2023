import axios from 'axios';

const baseUrl = 'https://restaurant-menu-api-v1.herokuapp.com/api';

export const handleLogin = async (username, password) => {
  try {
    const {data, status} = await axios({
      method: 'POST',
      url: `https://restaurant-menu-api-v1.herokuapp.com/api/signin`,
      data: {
        username: username,
        password: password,
      },
    });
    console.log(data);
    return {data, status};
  } catch (error) {
    return {status: 'failed', message: error.message};
  }
};

export const signUpData = async (name, username, password, email, contactNo) => {

  try {
    const {data, status} = await axios({
      method: 'POST',
      url: `https://restaurant-menu-api-v1.herokuapp.com/api/signup`,
      data: {
          name: name,
          username: username,
          password: password,
          email: email,
          contactNo: contactNo,
      },
    }); console.log (data);
    return {data, status};
  } catch (error) {
    return {status: 'failed', message: error.message};
  }
};
