import { View, Text, TouchableOpacity ,Image} from 'react-native'
import { FlatList } from 'react-native'
import React, { useEffect,useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/EmptyList'
import { useNavigation } from '@react-navigation/native'
import {auth, tripsRef} from '../config/firebase'
import { signOut } from 'firebase/auth'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'
import { useIsFocused } from '@react-navigation/native'

export default function HomeScreen() {
    const navigation=useNavigation();
    const {user}=useSelector(state=>state.user)
    const [trips,setTrips]=useState([])
    const isFocused=useIsFocused();

    const fetchTrips=async()=>{
        const q =query(tripsRef,where("userId","==",user.uid))
        const querySnapshot=await getDocs(q);
        let data=[];
        querySnapshot.forEach(doc=>{
            console.log('document',doc.data())
            data.push({...doc.data(),id:doc.id})
        })
        setTrips(data)
    }
    useEffect(()=>{
        if(isFocused)
        fetchTrips()
    },[isFocused])

    const handleLogout=async()=>{
        await signOut(auth);
    }

    // const items=[
    //     {
    //         id:1,
    //         place:'Gujrat',
    //         country:'Pakistan',
    //     },
    //     {
    //         id:2,
    //         place:'London Eye',
    //         country:'England',
    //     },
    //     {
    //         id:3,
    //         place:'Washington dc',
    //         country:'America',
    //     },
    //     {
    //         id:4,
    //         place:'New york',
    //         country:'America',
    //     },
    //     {
    //         id:5,
    //         place:'London Eye',
    //         country:'England',
    //     },
    //     {
    //         id:6,
    //         place:'Washington dc',
    //         country:'America',
    //     },
    //     {
    //         id:7,
    //         place:'New york',
    //         country:'America',
    //     },
    // ]
  return (
  <ScreenWrapper className="flex-1 ">
  <View className='flex-row justify-between items-center p-4'>
    <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Expensify</Text>
    <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border border-gray-300 rounded-full">
    <Text className={colors.heading}>Logout</Text>        
    </TouchableOpacity>
  </View>
  <View className="flex-row justify-center items-center bg-blue-200 rounded-2xl mx-4 mb-4">
    <Image source={require('../assets/images/banner.png')} className='w-60 h-60'/>
  </View>
  <View className='px-4 space-y-3'>
        <View className='flex-row justify-between items-center'>
            <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
            <TouchableOpacity className='p-2 px-3 bg-white border border-gray-300 rounded-full' onPress={()=>navigation.navigate('AddTrip')}>
                <Text className={colors.heading}>Add Trip</Text>
            </TouchableOpacity>
        </View>
        <View style={{height:330}}>
            <FlatList
            data={trips}
            numColumns={2}
            ListEmptyComponent={<EmptyList message={'You have not recorded any trips yet'}/>}
            keyExtractor={item=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{justifyContent:'space-between'}}
            className='mx-1'
            renderItem={({item})=>{
                const imagepath=randomImage()
                return(
                    <TouchableOpacity onPress={()=>navigation.navigate('TripExpenses',{...item})} className='bg-white p-3 rounded-2xl mb-2 border border-gray-500 shadow-sm'>
                        <View>
                            <Image source={imagepath} className='w-36 h-20 mb-2'/>
                            <Text className={`${colors.heading} font-bold text-center`}>{item.place}</Text>
                            <Text className={`${colors.heading} font-xs text-center`}>{item.country}</Text>

                        </View>
                    </TouchableOpacity>
                )
            }}
            />
        </View>
  </View>
  </ScreenWrapper>
  )
}