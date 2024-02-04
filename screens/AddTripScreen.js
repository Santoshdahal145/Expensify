import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { tripsRef } from '../config/firebase'

export default function AddTripScreen() {
    const [place,setPlace]=useState('')
    const [country,setCountry]=useState('')
    const [loading,setLoading]=useState(false)
    const {user}=useSelector(state=>state.user)

    const navigation=useNavigation();

    const handleAddTrip=async()=>{
        if(place && country){
            //good to go
            // navigation.navigate('Home')
            setLoading(true)
            let doc=await addDoc(tripsRef,{
                place,
                country,
                userId:user.uid,
            })
            setLoading(false)
            if(doc && doc.id){
                navigation.goBack();
            }
        }
        else{
            //show error
            Snackbar.show({
                text:'place and country are required',
                backgroundColor:'red'
              });
        }
    }
  return (
<ScreenWrapper>
    <View className="flex justify-between h-full mx-4 ">
        <View>
        <View className="relative mt-5">
            <View className="absolute top-0 left-0">
                <BackButton/>
            </View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
        </View>
        <View className="flex-row justify-center my-3 mt-5">
            <Image className='h-72 w-72' source={require('../assets/images/4.png')}/>
        </View>
        <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>Where on Earth?</Text>
            <TextInput className="p-4 bg-gray-200 rounded-full mb-3" value={place} onChangeText={value=>setPlace(value)}/>
            <Text className={`${colors.heading} text-lg font-bold`}>Which Country?</Text>
            <TextInput className="p-4 bg-gray-200 rounded-full mb-3" value={country} onChangeText={value=>setCountry(value)}/>
        </View>
    </View>
    <View>
        {
            loading?(<Loading/>):
            (<TouchableOpacity onPress={handleAddTrip} style={{backgroundColor:colors.button}}className="my-6 rounded-full p-3 shadow-sm mx-2">
            <Text className="text-center text-white text-lg font-bold">Add Trip</Text>
        </TouchableOpacity>)
        }
        
    </View>
       
        
    </View>
</ScreenWrapper>
  )
}