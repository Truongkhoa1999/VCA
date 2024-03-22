import { StyleSheet } from "react-native";

export const userProfileStyleObj = StyleSheet.create({
  profileUserWrapper: {
    display: "flex",
    flexDirection: "column",

  },
  userProfileImage_wrapper: {
    position: "absolute",
    top: 60,
  
  },
  userProfile_img: {
    width: 150,
    height: 150,
  },
  userProfileImageEdit_button: {
    width: 30,
    height:30,
  },
  userProfileImageEditButton_text: {
    color:"red",
  },

  userInformation_container: {
    marginTop: 25,
    marginHorizontal: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",


  },
});
