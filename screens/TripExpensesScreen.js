import { View, Text, TouchableOpacity ,Image} from 'react-native'
import { FlatList } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/EmptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import BackButton from '../components/BackButton'
import ExpenseCard from '../components/ExpenseCard'
import { useState,useEffect } from 'react'
import { getDocs, query, where } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'

const items=[
  {
   id:1,
   title:'ate sandwich',
   amount:4,
   category:'food',
  },
  {
   id:2,
   title:'bought a jacket',
   amount:54,
   category:'shopping',
  },
  {
   id:3,
   title:'watched a movie',
   amount:100,
   category:'entertainment',
  },
]

export default function TripExpensesScreen(props) {
    const {id,place,country}=props.route.params;
    const navigation=useNavigation();
    const [expenses,setExpenses]=useState([])
    const isFocused=useIsFocused();

    const fetchExpenses=async()=>{
        const q =query(expensesRef,where("tripId","==",id))
        const querySnapshot=await getDocs(q);
        let data=[];
        querySnapshot.forEach(doc=>{
            console.log('document',doc.data())
            data.push({...doc.data(),id:doc.id})
        })
        setExpenses(data)
    }
    useEffect(()=>{
        if(isFocused)
        fetchExpenses()
    },[isFocused])
    
  return (
  <ScreenWrapper className="flex-1 ">
    <View className="px-4">
    <View className="relative mt-5">
            <View className="absolute top-2 left-0">
                <BackButton/>
            </View>
            <View>
            <Text className={`${colors.heading} text-xl font-bold text-center`}>{place}</Text>
            <Text className={`${colors.heading} text-xs text-center`}> {country}</Text>

            </View>
            
        </View>
  <View className="flex-row justify-center items-center  rounded-2xl mb-4">
    <Image source={require('../assets/images/7.png')} className='w-80 h-80'/>
  </View>
  <View className=' space-y-3'>
        <View className='flex-row justify-between items-center'>
            <Text className={`${colors.heading} font-bold text-xl`}>Expenses</Text>
            <TouchableOpacity className='p-2 px-3 bg-white border border-gray-300 rounded-full' onPress={()=>navigation.navigate('AddExpense',{id,place,country})}>
                <Text className={colors.heading}>Add Expense</Text>
            </TouchableOpacity>
        </View>
        <View style={{height:330}}>
            <FlatList
            data={expenses}
            ListEmptyComponent={<EmptyList message={'You have not recorded any expenses yet'}/>}
            keyExtractor={item=>item.id.toString()}
            showsVerticalScrollIndicator={false}
            className='mx-1'
            renderItem={({item})=>{
                const imagepath=randomImage()
                return(
               <ExpenseCard item={item}/>
                )
            }}
            />
        </View>
  </View>

    </View>

  </ScreenWrapper>
  )
}