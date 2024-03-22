// Types
import { UserDataProps, UserInfoEditFormData } from "@/types/schemas/user";
// Firebase tool
import {
  DocumentSnapshot,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const getUserData = async (
  uid: string
): Promise<UserDataProps | null> => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDocSnapshot: DocumentSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data() as UserDataProps;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUserData = async (
  documentId: string,
  newUserData: UserInfoEditFormData
): Promise<string> => {
  try {
    const userDocRef = doc(db, "users", documentId);
    await updateDoc(userDocRef, newUserData);
    return "User Information updated successfully!";
  } catch (error) {
    console.log(error);
    return "There is problem: " + error;
  }
};
export const updateUserProfileImg = async (
  documentId: string,
  storagePath: string
) => {
  try {
    const userDocRef = doc(db, "users", documentId);
    await updateDoc(userDocRef, {
      "images.profile": storagePath,
    });
    console.log("User profile image updated successfully");
  } catch (error) {
    console.error("Error updating user profile image:", error);
    throw error; 
  }
};

export const uploadUserProfileImgtoFirebaseStorage = async (
  selectedImageUri: string | undefined,
  uid: string
) => {
  if (!selectedImageUri) {
    throw new Error("No image selected");
  }
  const filename = `users/${uid}/profileImg/image_${new Date().getTime()}`
  // const filename = `image_${new Date().getTime()}`;
  const storageRef = ref(storage, filename);
  //  uri => blob
  const response = await fetch(selectedImageUri);
  const blob = await response.blob();
  const snapShot = await uploadBytes(storageRef,blob)
  console.log("Image uploaded to Firebase Storage:", snapShot);
  const downloadUrl = await getDownloadURL(snapShot.ref)
  return downloadUrl
};


// test
export const uploadAudioToFirestore = async (audioUri: string) => {
  if (!audioUri) {
    throw new Error("No audio recording selected");
  }
  const filename = `audio_${new Date().getTime()}.wav`;
  const storageRef = ref(storage, filename);
  try {
    const response = await fetch(audioUri);
    const blob = await response.blob();
    // Upload the audio file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, blob);
    console.log("Audio uploaded to Firebase Storage:", snapshot);
    // Get the download URL of the uploaded audio file
    const downloadUrl = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadUrl);
    return downloadUrl; // Return the download URL of the audio recording
  } catch (error) {
    console.error("Error uploading audio to Firebase Storage:", error);
    throw error;
  }
};

