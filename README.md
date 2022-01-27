# SpożywApka
![Login screen preview](https://i.imgur.com/rXWo7rP.png?2 "Login screen preview")
![Map with shops preview](https://i.imgur.com/vWlnLdc.png?2 "Map with shops preview")
![Products screen preview](https://i.imgur.com/WCbiN2z.png?2 "Products screen preview")

## About this project

This app was created in purpose of engineer thesis. It's simple business application which allows users to create and manage orders in selected grocery stores. It's also allows workers of grocery shops to collect orders and manage products of the store.

## How to run?
#### Testing:
  1. Install app using .apk file
  
#### Development:
  1. Clone repository
  2. Fill up `.env` file with Firebase credentials (webapp project)
  3. Install [Node.js](https://nodejs.org/en/) (if needed)
  4. Install expo-cli - `npm install --global expo-cli` (if needed)
  4. Run `npm install` then `npm start`
  5. Scan generated QR Code using [Expo app](https://play.google.com/store/apps/details?id=host.exp.exponent) on mobile device / Run on Android or iOS emulator
  
## Stack
### Frontend:
- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [UI Kitten 5.1](https://akveo.github.io/react-native-ui-kitten/)
- [React Navigation](https://reactnavigation.org/)
- [Redux](https://redux.js.org/) + [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend:
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Cloud Firestore](https://firebase.google.com/docs/firestore)
- [Cloud Storage for Firebase](https://firebase.google.com/docs/storage)
