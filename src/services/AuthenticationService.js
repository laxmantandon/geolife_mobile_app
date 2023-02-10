import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import {ApiContants} from '../contants';
// import userdata from './userdata';

const base_url ='https://crop.erpgeolife.com/api/method/geolife_agritech.v1.geolife_api'
// const base_url ='https://8fab-49-43-42-59.in.ngrok.io/api/method/geolife_agritech.v1.geolife_api'

// const [user, setuser] = useState([])


  // const userdata =async req=>{
    let user =[]
 
    const gettoken =()=>{
      let token ='jkh kjhk'
      AsyncStorage.getItem('user_info').then((muser) =>{
        // console.log('muser', muser) 
         user= JSON.parse(muser)
        //  console.log('muser', `token ${user.api_key}:${user.api_secret}`) 

          token = `token ${user.api_key}:${user.api_secret}`
        
         })
         return {
          'Content-Type': 'application/json',
          'Authorization': `token ${user.api_key}:${user.api_secret}`
        }

    }
   



const headers = gettoken()

const AuthRequest = axios.create({
  baseURL: ApiContants.BACKEND_API.BASE_API_URL,
});

const register = async user => {
  if (!user?.username || !user?.phone || !user?.password) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      username: user?.username,
      phone: user?.phone,
      password: user?.password,
    };
    let registerResponse = await AuthRequest.post(
      ApiContants.BACKEND_API.REGISTER,
      requestBody,
    );
    return registerResponse?.data.message
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const login = async user => {
  if (!user?.username || !user?.otpCode) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let requestBody = {
      mobile_no: user?.username,
      otp: user?.otpCode,
    };
    // console.log()
    let loginResponse = await AuthRequest.get(
      `${base_url}.validate_otp?mobile_no=${user?.username}&otp=${user?.otpCode}`,
    );
    return loginResponse?.data.message;
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const sendOTP = async user => {
  if (!user?.username) {
    return {status: false, message: 'Please fill up all fields'};
  }
  try {
    let loginResponse = await AuthRequest.get(
      `${base_url}.generate_otp?mobile_no=${user?.username}`
      
    );
    return loginResponse?.data.message;
  } catch (error) {
    console.log(error);
    return {status: false, message: error, url:`${base_url}.generate_otp?mobile_no=${user?.username}`
};
  }
};

const farmerData =async req=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer GEOLIFE.S1zRI1gprVmgYct9iqF9MfAvkeCS1YRYk9Ztgfzelop6eJgwaA1tJrJu");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

return fetch("https://api3.thefarmpeople.in/api/v1/users/external", requestOptions)
  // .then(response => response.text())
  // .then(result =>{result})
  // .catch(error => console.log('error', error));
}

const searchfarmerData =async req=>{
  var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer GEOLIFE.S1zRI1gprVmgYct9iqF9MfAvkeCS1YRYk9Ztgfzelop6eJgwaA1tJrJu");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "text": req
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

return fetch("https://api3.thefarmpeople.in/api/v1/users/external/search?page=1&limit=10", requestOptions)
  // .then(response => response.text())
  // .then(result => {
  //   console.log('farmer search', result)
    
  //   return result})
  // .catch(error => console.log('error', error));
}

const checkUserExist = async (type, value) => {
  try {
    let params = {[type]: value};
    let userCheckResponse = await AuthRequest.get(
      ApiContants.BACKEND_API.USER_EXIST, 
      {params},{headers:gettoken()}
    );
    
    return userCheckResponse?.data.message
  } catch (error) {
    console.log(error);
    return {status: false, message: 'Oops! Something went wrong'};
  }
};

const crop_seminar = async req => {
  try {

    let Response = AuthRequest.get(
      `${base_url}.crop_seminar`,
      {headers: headers},
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const create_crop_seminar = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.crop_seminar`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const update_crop_seminar = async req => {
  try {
    let Response = await AuthRequest.put(
      `${base_url}.crop_seminar`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};


const crop_alert = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.raise_crop_alert`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const activity_list = async req => {
  try {
    
    let Response = await AuthRequest.get(
      `${base_url}.activity_list`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};

  }
};

const create_activity = async req => {
  gettoken()
  console.log('gettoken()', gettoken())
  try {
    console.log(req)
    let Response = await AuthRequest.post(
      `${base_url}.activity_list`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const expenses_list = async req => {
  try {
    let Response =  AuthRequest.get(
      `${base_url}.expenses`,
      {headers: headers}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const create_expenses = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.expenses`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const door_to_door_awareness = async req => {
  gettoken()
  console.log('gettoken()', gettoken())
  try {
    let Response = await AuthRequest.post(
      `${base_url}.door_to_door_awareness`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const sticker_pasting = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.sticker_pasting`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const activity_type = async req => {
  try {
    gettoken()
    
    let Response = await AuthRequest.get(
      `${base_url}.activity_type`,{headers:gettoken()}
      
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong ', jj:headers};

  }
};

const create_free_sample = async req => {
  try {
    let Response = await AuthRequest.post(
      `${base_url}.create_free_sample`,
      req,{headers:gettoken()}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const update_status_free_sample = async req => {
  try {
    let Response = AuthRequest.get(
      `${base_url}.update_status_free_sample`,
      {headers: headers}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};
const whatsapp_templates = async req => {
  try {
    let Response = AuthRequest.get(
      `${base_url}.whatsapp_to_farmer`,
      {headers: headers}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};

const bk_center = async req => {
  try {
    let Response = AuthRequest.get(
      `${base_url}.bk_center`,
      {headers: headers}
    );
    return Response?.data.message
  } catch (error) {
    console.log(error);
    // ToastAndroid.showWithGravityAndOffset(
    //   'Oops! Something went wrong check internet connection',
    //   ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
    // );
    return {status: false, message: 'Oops! Something went wrong '};
  }
};



export default {login, sendOTP, searchfarmerData, farmerData, crop_seminar, create_crop_seminar, update_crop_seminar, 
  crop_alert, activity_list, create_activity, activity_type, expenses_list, create_expenses, whatsapp_templates,
  door_to_door_awareness , sticker_pasting, create_free_sample, update_status_free_sample,bk_center
};
