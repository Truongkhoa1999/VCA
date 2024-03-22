// React
import { View, Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
// component
import { UserProfileInformation } from "@/components/UserProfileInformation/UserProfileInformation";

// Type
import { UserDataProps } from "@/types/schemas/user";
// Utils
import { firebaseServicesLayer } from "@/services/users/firebaseServicesLayer";
import { AudioRecorder } from "@/components/AudioRecorder/AudioRecorder";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<UserDataProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = await firebaseServicesLayer.firebaseAuthentication.user.get.userLoginStatus()
        if (currentUser) {
          setIsLoading(true)
          const userData = await firebaseServicesLayer.firebaseDatabase.user.get.userById(currentUser)
          if(userData){
            setUser(userData)
            setIsLoading(false)
          } else{
            setUser(null)
          }
        }
      } catch (error) {
        console.log(error)
        setIsLoading(true)
      }
    }
  fetchUserData()
  }, [])

  return (
    <ScrollView>
      {isLoading ? (
        <Text style={{ marginTop: 100 }}>loading bro</Text>
      ) : user ? (
        <View>
          <UserProfileInformation user={user} />
        </View>
      ) : (
        <Text style={{ marginTop: 100 }}>User is null</Text>
      )}
      <AudioRecorder />
    </ScrollView>
  );
};
export default UserProfile;
