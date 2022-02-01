// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar, LogBox, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import Home from './screens/Home';
import Users from './screens/Users';
import ListOfChilds from './screens/ListOfChilds';
import AssignWords from './screens/AssignWords';
import AddChild from './screens/AddChild';
import Dashboard from './screens/Dashboard';
import AddWords from './screens/AddWord';
import ListOfWords from './screens/ListOfWords';
import MyWords from './screens/MyWords';
import WordDetail from './screens/WordDetail';
import SoundRecorder from './screens/SoundRecorder';
const Stack = createNativeStackNavigator();

function App({navigation}) {
  LogBox.ignoreLogs(['new NativeEventEmitter']);
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={'#3EB489'} />
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#3EB489'
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} 
        // options={{
        //   headerLeft: () => (
        //     <Icon name='arrow-back' size={30} style={{ marginRight: 15 }}
        //       onPress={() => {goBack()}}
        //       color="#fff"
        //     />
        //   ),


        // }}
         />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddChild" component={AddChild} />
        <Stack.Screen name="ListOfChilds" component={ListOfChilds} />
        <Stack.Screen name="AddWords" component={AddWords} />
        <Stack.Screen name="AssignWords" component={AssignWords} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="ListOfWords" component={ListOfWords} />
        <Stack.Screen name="MyWords" component={MyWords} />
        <Stack.Screen name="WordDetail" component={WordDetail} />
        <Stack.Screen name="SoundRecorder" component={SoundRecorder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;