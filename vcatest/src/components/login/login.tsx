import React, { useState, useEffect } from "react";
import {
  View,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
// import { db, auth } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../../firebase";
import { StackScreenProps } from "@react-navigation/stack";
import { ApplicationStackParamList } from "@/types/navigation";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

type LoginScreenProps = StackScreenProps<ApplicationStackParamList, 'Login'>;

const Login: React.FC<LoginScreenProps> =({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false)
  const [userData, setUserData] = useState([]);
  //
  //read user from firebase
  useEffect(() => {
    const getData = async () => {
      const result = [];
      const querySnapshot = await getDocs(collection(db, "useraccounts"));
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
        // console.log(`${doc.id} => ${doc.data()}`);
      });
      setUserData(result);
    };
    getData();
  }, []);
  console.log(userData);
  
  console.log(password.trim());
  console.log(email.trim());
  

  //Verify account
  const signIn = async (email, password)=>{
    try{
      const userCredential  = await signInWithEmailAndPassword(auth, "tdkhoa.aqua@gmail.com", "1234567")
      console.log('hello');
      if(userCredential){
        const useraccount = userCredential.user
        setSignInSuccess(!signInSuccess)
        navigation.navigate("UserProfile")
      }
      else{
        console.log('Unauthentication');
      }
    }catch(error){
    console.log("yes i am running here")
      console.log(error);
    }
  }

  return (
    // <ImageBackground source={require('../../assets/images/background.png')} style={{height:'100%', width:"100%"}}>

    <SafeAreaView>
      <View style={{ height: "100%", width: "100%"}}>
        {/*Email, password */}
        <View
          style={{
            height: "20%",
            width: "100%",
            marginTop: 0.35 * windowHeight,
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
              width: "70%",
              alignItems: "center",
            }}
          >
            <Text>Email</Text>
            <TextInput
              onChangeText={setEmail}
              autoCapitalize="none"
              style={{
                height: "100%",
                width: "70%",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                textAlign: "right",
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
              width: "70%",
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <Text>Password</Text>
            <TextInput
              onChangeText={setPassword}
              autoCapitalize="none"
              style={{
                height: "100%",
                width: "70%",
                borderBottomWidth: 1,
                borderBottomColor: "black",
                textAlign: "right",
                paddingRight: 35,
              }}
              secureTextEntry={passwordVisible ? false : true}
            />
            <TouchableOpacity
              style={{
                height: 30,
                width: 30,
                backgroundColor: "white",
                position: "absolute",
                right: 0,
              }}
              onPress={() => {
                setPasswordVisible(!passwordVisible);
              }}
            >
              {passwordVisible ? (
                <Image
                  source={require("../../assets/images/view.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../assets/images/hide.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/*Bottun */}
        <View
          style={{
            height: "10%",
            width: "100%",
            marginTop: 0.2 * windowHeight,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: "50%",
              width: "60%",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={ () => signIn(email, password)}
              // onPress={() => {
              //   navigation.navigate("UserProfile");
              // }}
              style={{
                height: "100%",
                width: "40%",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
              style={{
                height: "100%",
                width: "40%",
                borderWidth: 1,
                borderRadius: 20,
                borderColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
    // </ImageBackground>
  );
}

export default Login;
