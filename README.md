Here’s the complete **README.md** with the final section added for the `MapScreen`:

---

# Uber Clone

This is a clone of the Uber app built with **React Native**, **Expo**, **Redux Toolkit**, and various third-party libraries for navigation, maps, and API integration.

## Table of Contents
- [Setting the Development Environment](#setting-the-development-environment)
- [Setting up Redux](#setting-up-the-redux)
- [Making Home Screen](#making-home-screen)
- [Implement React Native Navigation](#implement-react-native-navigation)
- [Google Autocomplete Library](#google-autocomplete-library)
- [Finish Up MapScreen](#finish-up-mapscreen)

---

## Setting the Development Environment

1. Follow the React Native environment setup instructions: [Environment Setup](https://reactnative.dev/docs/environment-setup).

2. Install Expo CLI:

   ```bash
   npm install -g expo-cli
   ```

3. Initialize a new Expo project:

   ```bash
   expo init AwesomeProject
   cd AwesomeProject
   npm start # You can also use: expo start
   ```

4. Run the application:
   - Scan the QR code from your phone.
   - Install the `expo-client` app on your phone.

---

## Setting Up Redux

1. Follow the Redux Toolkit setup guide: [Redux Toolkit Documentation](https://redux-toolkit.js.org/introduction/getting-started).

2. Install Redux and its dependencies:

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

3. Create the Redux store:
   
   - Create the directory and files:

     ```bash
     mkdir -p redux/store
     touch redux/store/store.js
     ```

   - Add the following code to `store.js`:

     ```js
     import { configureStore } from "@reduxjs/toolkit";
     import navReducer from "../../slices/navSlice";

     export const store = configureStore({
       reducer: {
         nav: navReducer,
       },
     });
     ```

4. Create the `navSlice.js`:

   - Create the file:

     ```bash
     mkdir slices
     touch slices/navSlice.js
     ```

   - Add the following code to `navSlice.js`:

     ```js
     import { createSlice } from "@reduxjs/toolkit";

     const initialState = {
       origin: null,
       destination: null,
       travelTimeInformation: null,
     };

     export const navSlice = createSlice({
       name: "nav",
       initialState,
       reducers: {
         setOrigin: (state, action) => {
           state.origin = action.payload;
         },
         setDestination: (state, action) => {
           state.destination = action.payload;
         },
         setTravelTimeInformation: (state, action) => {
           state.travelTimeInformation = action.payload;
         },
       },
     });

     export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;
     export default navSlice.reducer;
     ```

---

## Making Home Screen

1. Create the `screens` directory and `HomeScreen.js`:

   ```bash
   mkdir screens
   touch screens/HomeScreen.js
   ```

2. Install necessary libraries:

   ```bash
   npm install tailwind-react-native-classnames
   npm install react-native-elements react-native-vector-icons react-native-safe-area-context
   ```

3. Add the following code to `NavOptions.js`:

   ```bash
   mkdir components
   touch components/NavOptions.js
   ```

   ```js
   import React from "react";
   import { FlatList, Image, TouchableOpacity, View, Text } from "react-native";
   import { Icon } from "react-native-elements";
   import tw from "tailwind-react-native-classnames";

   const data = [
     { id: "123", title: "Get a ride", image: "https://links.papareact.com/3pn", screen: "MapScreen" },
     { id: "456", title: "Order food", image: "https://links.papareact.com/28w", screen: "EatsScreen" },
   ];

   const NavOptions = () => {
     return (
       <FlatList
         data={data}
         keyExtractor={(item) => item.id}
         horizontal
         renderItem={({ item }) => (
           <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
             <View>
               <Image style={{ width: 120, height: 120, resizeMode: "contain" }} source={{ uri: item.image }} />
               <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
               <Icon style={tw`p-2 bg-black rounded-full w-10 mt-4`} name="arrowright" color="white" type="antdesign" />
             </View>
           </TouchableOpacity>
         )}
       />
     );
   };

   export default NavOptions;
   ```

4. Add the following code to `HomeScreen.js`:

   ```js
   import React from "react";
   import { Image, SafeAreaView, View } from "react-native";
   import tw from "tailwind-react-native-classnames";
   import NavOptions from "../components/NavOptions";

   const HomeScreen = () => {
     return (
       <SafeAreaView style={tw`bg-white h-full`}>
         <View style={tw`p-5`}>
           <Image style={{ width: 100, height: 100, resizeMode: "contain" }} source={{ uri: "https://links.papareact.com/gzs" }} />
           <NavOptions />
         </View>
       </SafeAreaView>
     );
   };

   export default HomeScreen;
   ```

---

## Implement React Native Navigation

1. Install the required navigation libraries:

   ```bash
   npm install @react-navigation/native
   expo install react-native-screens react-native-safe-area-context
   npm install @react-navigation/native-stack
   ```

2. Modify `App.js` to integrate navigation:

   ```js
   import React from "react";
   import { Provider } from "react-redux";
   import { store } from "./redux/store/store";
   import { NavigationContainer } from "@react-navigation/native";
   import { createNativeStackNavigator } from "@react-navigation/native-stack";
   import HomeScreen from "./screens/HomeScreen";
   import MapScreen from "./screens/MapScreen";
   import { SafeAreaProvider } from "react-native-safe-area-context";

   export default function App() {
     const Stack = createNativeStackNavigator();
     return (
       <Provider store={store}>
         <NavigationContainer>
           <SafeAreaProvider>
             <Stack.Navigator>
               <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
               <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }} />
             </Stack.Navigator>
           </SafeAreaProvider>
         </NavigationContainer>
       </Provider>
     );
   }
   ```

---

## Google Autocomplete Library

1. Install Google Places Autocomplete:

   ```bash
   npm install react-native-google-places-autocomplete --save
   ```

2. Get your API key from Google Cloud and store it in a `.env` file.

3. Install `react-native-dotenv` for loading environment variables:

   ```bash
   npm install react-native-dotenv
   ```

4. Update `babel.config.js`:

   ```js
   module.exports = function (api) {
     api.cache(true);
     return {
       presets: ["babel-preset-expo"],
       plugins: [
         [
           "module:react-native-dotenv",
           {
             moduleName: "@env",
             path: ".env",
           },
         ],
       ],
     };
   };
   ```

5. Use `GooglePlacesAutocomplete` in `HomeScreen.js`:

   ```js
   import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
   import { GOOGLE_MAPS_APIKEY } from "@env";

   <GooglePlacesAutocomplete
     placeholder="Where From?"
     nearbyPlacesAPI="GooglePlacesSearch"
     debounce={400}
     query={{ key: GOOGLE_MAPS_APIKEY, language: "en" }}
   />
   ```

---

## Finish Up MapScreen

1. Create `MapScreen.js` in the `screens` directory:

   ```bash
   touch screens/MapScreen.js
   ```

2. Add the following code to `MapScreen.js`:

   ```js
   import React from "react";
   import { StyleSheet, TouchableOpacity, View } from "react-native";
   import tw from "tailwind-react-native-classnames";
   import { Icon } from "react-native-elements";
   import { useNavigation } from "@react-navigation/native";
   import Map from "../components/Map";
   import { createStackNavigator } from "@react-navigation/stack";
   import NavigateCard from "../components/NavigateCard";
   import RideOptionsCard from "../components/RideOptionsCard";

   const MapScreen = () => {
     const Stack = createStackNavigator();
     const navigation = useNavigation();

     return (
       <View>
         <TouchableOpacity
           onPress={() => navigation.navigate("HomeScreen")}
           style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
         >
           <Icon name="menu" />
         </TouchableOpacity>

         <View style={tw`h-1/2`}>
           <Map />
         </View>

         <View style={tw`h-1/2`}>
          

 <Stack.Navigator>
             <Stack.Screen
               name="NavigateCard"
               component={NavigateCard}
               options={{
                 headerShown: false,
               }}
             />
             <Stack.Screen
               name="RideOptionsCard"
               component={RideOptionsCard}
               options={{
                 headerShown: false,
               }}
             />
           </Stack.Navigator>
         </View>
       </View>
     );
   };

   export default MapScreen;

   const styles = StyleSheet.create({});
   ```

3. You can now add more components like `NavigateCard.js` and `RideOptionsCard.js` in the `components` folder to complete the map functionality.

