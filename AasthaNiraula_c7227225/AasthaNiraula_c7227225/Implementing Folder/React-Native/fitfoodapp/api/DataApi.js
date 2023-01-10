import axios from "axios";
const baseUrl = "https://restaurant-menu-api-v1.herokuapp.com/api";

/******************** POST ORDER DATA ********************/

export const sendOrder = async ( token, orderDate, orderDetail ) => {
    const url =`${baseUrl}/orders`;

    const headers = { Authorization:`Bearer ${token}`,
                    Accept:`application/json`};
    try{
        const {data, status} = await axios({
            method:'POST',
            url: url,
            headers:headers,
            data: {
                orderDate: orderDate,
                orderDetail: orderDetail,
            }
        });
        return {data, status}
    }
    catch(error) {
        return { error: true, status:'failed', message:error.message};
    }
};

/********************GET MENU ITEM DATA ********************/

export const getMenuItem = async (token) => {
    const url = `${baseUrl}/foods`;

    const headers = {
        Authorization: `Bearer ${token}`,
        Accept: `application/json`
    };
    try {
        const { data, status } = await axios({
            method: 'GET',
            url: url,
            headers: headers,
        });
        return { data, status }
    }
    catch (error) {
        return { error: true, status: 'failed', message: error.message };
    }
}