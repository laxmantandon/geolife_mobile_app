const config = require('../../package.json').projectConfig;
// const BACKEND_BASE_URL = 'http://localhost:8000';
const BACKEND_BASE_URL = config.backendApiBaseUrl;


const COUNTRY_FLAG = {
  BASE_URL: `http://localhost:8000`,
  SIZE: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
  STYLE: {FLAT: 'flat', SHINY: 'shiny'},
};

const BACKEND_API = {
  BASE_API_URL: `${BACKEND_BASE_URL}api/method/geolife_agritech.v1.geolife_api`,
  SEND_OTP: '.generate_otp',
  LOGIN: '.validate_otp',
  USER_EXIST: '/proses-api.php',
};

export default {COUNTRY_FLAG, BACKEND_API};
