# React Native - Geolife Mobile App


## Setup instructions

### 1. Clone Repository

```sh
# Clone the app
git clone -b master origin https://github.com/laxmantandon/geolife-mobile-app
```

### 2. Install all dependencies

```sh
# navigate to app directory
cd geolife-mobile-app


npm install
```
### 3. Build Android APK
```sh
# Open terminal

1. npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

2. cd android
 
3. gradlew assembleDebug 


```
### 3. running app on emulator 
```
npx react-native run-android
