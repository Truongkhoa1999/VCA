import React, { useState } from 'react'
import {View,ImageBackground, SafeAreaView, StatusBar, Text, Dimensions, TextInput, TouchableOpacity, Image} from 'react-native'
import { setDoc, doc } from "firebase/firestore";
import { db } from '@/firebase';
const windowWidth = Dimensions.get('window').width
const windowHeight= Dimensions.get('window').height
function Register({navigation}) {
  const [email, setEmail] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)

    const signUp = async()=>{
        try{
            const waitSignUp = await setDoc(doc(db, "useraccounts", 'J63iIHf091Jw6D9sSP8N'), {
              email: "LosAngeles@email.com",
              password: "CA",
              user_id: "2",
              username: "USA"
            });
        } catch (error){
            console.log(error);
            
        }
        navigation.goBack()
    }
  
  return (
    // <ImageBackground source={require('../../assets/images/background.png')} style={{height:'100%', width:"100%"}}>
      
        <SafeAreaView>
            <View style={{ height:'100%', width:'100%'}}>
                {/*Email, password */}
                <View style={{height: '20%', width:'100%', marginTop: 0.35*windowHeight, alignItems:'center'} }>
                    <View style={{flexDirection: 'row',justifyContent:'space-between', height: 40, width:'70%', alignItems:'center'}}>
                        <Text>Email</Text>
                        <TextInput onChangeText={setEmail} autoCapitalize='none' style={{height: '100%', width:'70%', borderBottomWidth: 1, borderBottomColor: 'black', textAlign:'right'}}/>
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'space-between', height: 40, width:'70%', marginTop:20, alignItems:'center'}}>
                        <Text >Password</Text>
                        <TextInput autoCapitalize='none' 
                                 style={{height: '100%', width:'70%', borderBottomWidth: 1, borderBottomColor: 'black',  textAlign:'right', paddingRight:35}}
                                 secureTextEntry={passwordVisible ? false : true}
                                 />
                        <TouchableOpacity  
                            style={{height:30, width: 30, backgroundColor:"white", position:'absolute', right:0}}
                            onPress={()=>{setPasswordVisible(!passwordVisible)}}
                        >
                          {passwordVisible ? 
                          <Image  source={require('../../assets/images/view.png')} style={{width:'100%', height:'100%'}} resizeMode='contain'/> 
                          :
                                            
                          <Image  source={require('../../assets/images/hide.png')} style={{width:'100%', height:'100%'}} resizeMode='contain'/>
                        }
                          
                        </TouchableOpacity>  
                    </View>
                    <View style={{flexDirection: 'row',justifyContent:'space-between', height: 40, width:'70%', marginTop:20, alignItems:'center'}}>
                        <Text >C.Password</Text>
                        <TextInput autoCapitalize='none' 
                                 style={{height: '100%', width:'70%', borderBottomWidth: 1, borderBottomColor: 'black',  textAlign:'right', paddingRight:35}}
                                 secureTextEntry={passwordVisible ? false : true}
                                 />
                        <TouchableOpacity  
                            style={{height:30, width: 30, backgroundColor:"white", position:'absolute', right:0}}
                            onPress={()=>{setPasswordVisible(!passwordVisible)}}
                        >
                          {passwordVisible ? 
                          <Image  source={require('../../assets/images/view.png')} style={{width:'100%', height:'100%'}} resizeMode='contain'/> 
                          :
                                            
                          <Image  source={require('../../assets/images/hide.png')} style={{width:'100%', height:'100%'}} resizeMode='contain'/>
                        }
                          
                        </TouchableOpacity>  
                    </View>
                </View>

              {/*Bottun */}
              <View style={{height:"10%", width:'100%', marginTop:0.2*windowHeight, alignItems:'center', justifyContent:'center'}}>
                <View style={{height:'50%', width:'60%', justifyContent:'center', flexDirection:'row', borderWidth:1}}>
                  <TouchableOpacity 
                    onPress={()=>{signUp()
                        
                    }}
                  style={{height:"100%", width:"40%", borderWidth:1, borderRadius:20,borderColor:'black', justifyContent:'center', alignItems:'center', }}>
                    <Text style={{ fontWeight:'500'}}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        </SafeAreaView>
    // </ImageBackground>
  )
}

export default Register