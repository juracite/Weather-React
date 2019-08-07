import axios from 'axios';
import * as Facebook from 'expo-facebook';
import { AsyncStorage } from 'react-native';
import {
  SET_CURRENT_WEATHER,
  SET_FORECAST_WEATHER,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_ERROR
} from '../actions/action-types';
import { API_KEY, FACEBOOK_APP_ID } from '../constant';

const WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const FORECAST_WEATHER_BASE_URL =
  'http://api.openweathermap.org/data/2.5/forecast';

export const getCurrentWeatherByCity = city => async dispatch => {
  const response = await axios.get(
    `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_CURRENT_WEATHER, payload: response.data });
};

export const getForecastWeatherByCity = city => async dispatch => {
  const response = await axios.get(
    `${FORECAST_WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}`
  );
  dispatch({ type: SET_FORECAST_WEATHER, payload: response.data });
};

export const facebookLogin = (onSuccess, onError) => dispatch => {
  Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
    permission: ['public_profile']
  })
    .then(fbResponse => {
      if (fbResponse.type === 'success') {
        setToken(fbResponse.token);
        AsyncStorage.setItem('fbToken', fbResponse.token);
        onSuccess && onSuccess();
      } else {
        dispatch({ type: FACEBOOK_LOGIN_ERROR, payload: null });
        onError && onError();
      }
    })
    .catch(error => {
      // dispatch error
    });
};

export const setToken = token => dispatch => {
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
