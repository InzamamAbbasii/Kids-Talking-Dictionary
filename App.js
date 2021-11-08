// In App.js in a new project

import * as React from 'react';
import { View, Text,StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Users from './screens/Users';
import SelectWord from './screens/SelectWord';
import AddChild from './screens/AddChild';
import Students from './screens/Students';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#3EB489'}/>
      <Stack.Navigator screenOptions={{
        headerStyle:{
          backgroundColor:'#3EB489'
        },
           headerTintColor:'#ffffff',
            headerTitleStyle: {
            fontWeight: 'bold',
          },
          }}>
        <Stack.Screen name="Students" component={Students} />
        <Stack.Screen name="AddChild" component={AddChild} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SelectWord" component={SelectWord} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;