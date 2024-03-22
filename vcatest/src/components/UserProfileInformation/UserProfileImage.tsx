// React 
import { Image, View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
// Styles
import { userProfileStyleObj } from "./styleObject/userProfileStyleObj";
// types
import { UserDataProps } from "@/types/schemas/user";
import { chooseImage } from "@/util/user/updateInformation/chooseImage";
// utils
import { firebaseServicesLayer } from "@/services/users/firebaseServicesLayer";


export const UserProfileImage = ({ user }: { user: UserDataProps; }) => {
    const handleRequestUpdateProfileImg =async () => {
        const desiredImg = chooseImage()
        if(desiredImg !== undefined){
            const downloadUrl = firebaseServicesLayer.firebaseFirestore.user.post.userProfileImg(await desiredImg, user.id)
            firebaseServicesLayer.firebaseDatabase.user.update.userProfileImage(user.id,await downloadUrl)
        } 
    }
    return (
        <View style={userProfileStyleObj.userProfileImage_wrapper}>
            <Image
                source={{ uri: user.images.profile }}
                style={userProfileStyleObj.userProfile_img}
            />
            <TouchableOpacity
                onPress={handleRequestUpdateProfileImg}
                style={userProfileStyleObj.userProfileImageEdit_button}>
                <Text style={userProfileStyleObj.userProfileImageEditButton_text}>edit</Text>
            </TouchableOpacity>
        </View>

    )
}