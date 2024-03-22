import React from 'react'
import {View,ImageBackground, SafeAreaView, StatusBar, Text, Dimensions, TextInput, TouchableOpacity, Image} from 'react-native'

const windowWidth = Dimensions.get('window').width
const windowHeight= Dimensions.get('window').height

function Home({navigation}) {
  return (
    <SafeAreaView>
        <View style={{height:"20%", width:"100%",  flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity 
          
            onPress={()=>{
              navigation.goBack()
            }}
            style={{height:30, width:'20%', flexDirection:'row', alignItems:'center'}}>
            <Image  style={{height:30, width: 30}} resizeMode="contain" source={require('../../assets/images/back.png')}/>
            <View style={{flex:1, justifyContent:'center', paddingLeft: 10}}>
            <Text>Back</Text>

            </View>
          </TouchableOpacity>

        </View>
        <View style={{height:"20%", width:"100%", marginTop: 0.2 * windowHeight, justifyContent:'center', alignItems:'center'}}> 
            <Text style={{fontSize:30}}>HOME</Text>
        </View>
    </SafeAreaView>
  )
}

export default Home