import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useSelector,useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import {auth} from '../config/firebase'
import { setUser } from '../redux/slices/user';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const {user}=useSelector(state=>state.user);

  const dispatch=useDispatch();

  onAuthStateChanged(auth,u=>{
    console.log('got user',u)
    dispatch(setUser(u))
  })

  if (user){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
          <Stack.Screen name="AddTrip" component={AddTripScreen} options={{headerShown:false}} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{headerShown:false}} />
          <Stack.Screen name="TripExpenses" component={TripExpensesScreen} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown:false,animation:'slide_from_bottom',presentation:'modal'}} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false,animation:'slide_from_bottom',presentation:'modal'}} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}} />
  
  
        </Stack.Navigator>
      </NavigationContainer>
    );

  }
    

}