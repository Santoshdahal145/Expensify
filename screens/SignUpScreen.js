import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from '../redux/slices/user'
import Loading from '../components/Loading'


export default function SignUpScreen() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {userLoading}=useSelector(state=>state.user);

    const navigation=useNavigation();
    const dispatch=useDispatch();

    const handleSubmit=async()=>{
        if(email && password){
            //good to go
            // navigation.navigate('Home')
            try {
                dispatch(setUserLoading(true))
                await createUserWithEmailAndPassword(auth,email,password);
                dispatch(setUserLoading(false))
                
            } catch (error) {
                dispatch(setUserLoading(false))
                Snackbar.show({
                    text:error.message,
                    backgroundColor:'red'
                  });
            }
        }
        else{
            //show error
            Snackbar.show({
                text: 'Email and password required',
                backgroundColor:'red'
              });
        }
    }
  return (
<ScreenWrapper>
    <View className="flex justify-between h-full mx-4 ">
        <View>
        <View className="relative">
            <View className="absolute top-0 left-0">
                <BackButton/>
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
        </View>
        <View className="flex-row justify-center my-3 mt-5">
            <Image className='h-72 w-72' source={require('../assets/images/signup.png')}/>
        </View>
        <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
            <TextInput className="p-4 bg-gray-200 rounded-full mb-3" value={email} onChangeText={value=>setEmail(value)}/>
            <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
            <TextInput className="p-4 bg-gray-200 rounded-full mb-3" secureTextEntry value={password} onChangeText={value=>setPassword(value)}/>
        </View>
    </View>
    <View>
    {
            userLoading?(
                <Loading/>
            ):(
                <TouchableOpacity onPress={handleSubmit} style={{backgroundColor:colors.button}}className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">Sign Up</Text>
        </TouchableOpacity>

            )
        }
      
    </View>
       
        
    </View>
</ScreenWrapper>
  )
}