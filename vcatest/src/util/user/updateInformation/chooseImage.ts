import {
  ImageLibraryOptions,
  ImagePickerResponse,
} from "react-native-image-picker";
import * as ImagePicker from "react-native-image-picker";


export const chooseImage = (): Promise<string | undefined> => {
  console.log("yes clicked");

  return new Promise((resolve, reject) => {
    const option: ImageLibraryOptions = {
      mediaType: "photo",
    };
    ImagePicker.launchImageLibrary(option, (response: ImagePickerResponse) => {
      console.log("This is response:", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
        reject("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("Unintentional error:", response.errorMessage);
        reject(response.errorMessage);
      } else {
        console.log("Everything just fine");
        console.log("This is response:", response);
        const selectImageUri = response.assets?.[0]?.uri;   if (selectImageUri) {
          resolve(selectImageUri);
        } else {
          reject("Selected image URI is undefined");
        }
      }
    });
  });
};
// maybe later use
// const requestPermission = async (): Promise<string> => {
//   let permissionResult: string;
//   if (Platform.OS === "ios") {
//     permissionResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
//   } else {
//     permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
//   }
//   return permissionResult;
// };
