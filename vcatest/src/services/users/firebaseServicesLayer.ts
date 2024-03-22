import { checkIfUserLogin } from "@/util/user/checkIfUserLogin";
import {
  getUserData,
  updateUserData,
  updateUserProfileImg,
  uploadUserProfileImgtoFirebaseStorage,
} from "@/util/user/userFirebaseRepository";

 const firebaseDatabase = {
  user: {
    get: {
      userById: getUserData,
    },
    update: {
      userPersonalInformation: updateUserData,
      userProfileImage: updateUserProfileImg,
    },
  },
};
 const firebaseFirestore = {
  user: {
    post: {
      userProfileImg: uploadUserProfileImgtoFirebaseStorage,
    },
  },
};

 const firebaseAuthentication = {
    user:{
        get:{
            userLoginStatus: checkIfUserLogin
        }
    }
}
export const firebaseServicesLayer = {
    firebaseDatabase: firebaseDatabase,
    firebaseFirestore:firebaseFirestore,
    firebaseAuthentication:firebaseAuthentication
}