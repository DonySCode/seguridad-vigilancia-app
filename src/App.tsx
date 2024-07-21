// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import RegisterIncidentScreen from './screens/RegisterIncidentScreen';
import IncidentListScreen from './screens/IncidentListScreen';
import IncidentDetailsScreen from './screens/IncidentDetailsScreen';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterIncident" component={RegisterIncidentScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IncidentList" component={IncidentListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IncidentDetails" component={IncidentDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
