// Types
import { firebaseServicesLayer } from "@/services/users/firebaseServicesLayer";
import { UserInfoEditFormData } from "@/types/schemas/user";
// React
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";


export const UserProfileEditForm = ({toggleFormEditing, uid}:{
  toggleFormEditing: ()=>void;
  uid:string
}) => {
  const [formData, setFormData] = useState<UserInfoEditFormData>({
    username: "",
    fullName: "",
    telephone: "",
    email: "",
  });

  const handleChange = (field: keyof UserInfoEditFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  const handleSubmit = async (action:string) => {
    switch(action){
      case "cancel":
        toggleFormEditing()
      case "submit":
        await firebaseServicesLayer.firebaseDatabase.user.update.userPersonalInformation(uid, formData)
      default:
        return
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formData.username}
        onChangeText={(text) => handleChange("username", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        value={formData.fullName}
        onChangeText={(text) => handleChange("fullName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Telephone"
        value={formData.telephone}
        onChangeText={(text) => handleChange("telephone", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => handleChange("email", text)}
      />
      <Button title="Submit" onPress={()=>handleSubmit("submit")} />
      <Button title="Cancel" onPress={()=>handleSubmit("cancel")}></Button>
    </View>
  );
};
// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
