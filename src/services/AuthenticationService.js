import axios from 'axios';
import {ApiContants} from '../contants';

const AuthRequest = axios.create({
  baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async user => {
  if (!user?.username || !user?.phone || !user?.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      aksi:user?.aksi,
      username: user?.username,
      phone: user?.phone,
      password: user?.password,
    };
    let registerResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.REGISTER,
      requestBody,
    );
    return registerResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const login = async user => {
  if (!user?.username || !user?.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      aksi: user?.aksi,
      username: user?.username,
      password: user?.password,
    };
    let loginResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.LOGIN,
      requestBody,
    );
    return loginResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const checkUserExist = async (type, value) => {
  try {
    let params = {[type]: value};
    let userCheckResponse = await AuthRequest.get(
      ApiContants.BACKEND_API.USER_EXIST, 
      {params},
    );
    return userCheckResponse?.data;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const Getgames = async user => {
  // if (!user?.username || !user?.password) {
  //   return {status: false, message: 'Please fill up all fields'};
  // }
  try {
    let requestBody = {
      aksi: user?.aksi,
      // username: user?.username,
      // password: user?.password,
    };
    let gameResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.LOGIN,
      user,
    );
    return gameResponse?.data;
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong in game'};
  }
};

export default {register, login, checkUserExist, Getgames};
