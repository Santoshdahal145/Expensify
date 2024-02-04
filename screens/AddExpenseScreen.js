import { View, Text,Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants'
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore'
import { expensesRef } from '../config/firebase'
import Loading from '../components/Loading'

export default function AddTripScreen(props) {
  let {id}=props.route.params;
    const [title,setTitle]=useState('')
    const [amount,setAmount]=useState('')
    const [category,setCategory]=useState('')
    const [loading,setLoading]=useState(false);


    const navigation=useNavigation();

    const handleAddExpense=async()=>{
        if(title && amount && category){
            //good to go
            // navigation.goBack();
            setLoading(true)
            let doc=await addDoc(expensesRef,
              {
                title,
                amount,
                category,
                tripId:id,
              });
              setLoading(false)
              if(doc && doc.id) navigation.goBack();

        }
        else{
            //show error
            Snackbar.show({
              text:'please fill all the fields!',
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
            <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
        </View>
        <View className="flex-row justify-center my-3 mt-5">
            <Image className='max-h-60 w-60' source={require('../assets/images/expenseBanner.png')}/>
        </View>
        <View className="space-y-2 mx-2">
            <Text className={`${colors.heading} text-lg font-bold`}>For What?</Text>
            <TextInput className="p-4 bg-gray-200 rounded-full mb-1" value={title} onChangeText={value=>setTitle(value)}/>
            <Text className={`${colors.heading} text-lg font-bold`}>How much?</Text>
            <TextInput className="p-4 bg-gray-200 rounded-full mb-1" value={amount} onChangeText={value=>setAmount(value)}/>
        </View>
    </View>

    <View className="mx-2 space-x-2">
      <Text className="text-lg font-bold">Category</Text>
      <View className="flex-row flex-wrap items-center">
          {
            categories.map(cat=>{
              let bgColor='bg-gray-200';
              if(cat.value==category) bgColor='bg-green-200'
              return(
                <TouchableOpacity onPress={()=>setCategory(cat.value)} key={cat.value}
                 className={`rounded-3xl ${bgColor} mr-2 px-2 p-3`}>
                  <Text className="">{cat.title}</Text>
                </TouchableOpacity>
              )
            })
          }
      </View>
    </View>

    <View>
    {
            loading?(<Loading/>):
            ( <TouchableOpacity onPress={handleAddExpense} style={{backgroundColor:colors.button}}className="my-1 rounded-full p-3 shadow-sm mx-2 mb-2">
            <Text className="text-center text-white text-lg font-bold">Add Expense</Text>
        </TouchableOpacity>)
        }
       
    </View>
       
        
    </View>
</ScreenWrapper>
  )
}