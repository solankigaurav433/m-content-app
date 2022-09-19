import axios from 'axios';
import { BASE_URL } from '@env';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosPublic = axios.create({ baseURL: `${BASE_URL}` });
export const axiosPrivate = axios.create({ baseURL: `${BASE_URL}` });

// let token = await AsyncStorage.getItem('userToken');
// axiosPrivate.interceptors.request.use(
//   (config) => {
//     console.log('config ', config);
//     if (!config.headers.Authorization) {
//       let temp = JSON.parse(token);
//       console.log('temp ', temp);
//       config.headers.Authorization = `Bearer ${temp}`;
//       console.log('config insid ', config);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// const refreshtoken = await AsyncStorage.getItem('refresh_token');
// export const refreshAuthLogic = async (failedRequest) => {
//   const data = {
//     refreshToken: JSON.parse(refreshtoken)
//   };
//   console.log('data in refreshuathloigc ', data);
//   const options = {
//     method: 'POST',
//     data,
//     url: `${BASE_URL}/refresh-token`
//   };
//   return axios(options)
//     .then(async (tokenRefreshResponse) => {
//       axiosPrivate.interceptors.request.use(
//         (config) => {
//           if (!config.headers.Authorization) {
//             config.headers.Authorization = `Bearer ${tokenRefreshResponse.data.token}`;
//           }
//           return config;
//         },
//         (error) => {
//           return Promise.reject(error);
//         }
//       );
//       failedRequest.response.config.headers.Authorization =
//         'Bearer ' + tokenRefreshResponse.data.token;
//       console.log('tokenrefresh.data ', tokenRefreshResponse.data);

//       const accesstoken = tokenRefreshResponse.data.token;
//       const refreshtoken = tokenRefreshResponse.data.refreshToken;
//       console.log('acc & refrs ', accesstoken, ' ', refreshtoken);
//       await AsyncStorage.setItem('token', accesstoken);
//       return Promise.resolve();
//     })
//     .catch((e) => {
//       console.log('e ', e);
//     });
// };
