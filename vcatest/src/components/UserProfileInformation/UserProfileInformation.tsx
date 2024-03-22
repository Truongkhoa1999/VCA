// Types
import { UserDataProps } from "@/types/schemas/user";
// React
import { View, Text, Image, Button } from "react-native";
import { useState } from "react";
// Components + style
import { UserProfileEditForm } from "../UserProfileEditForm/UserProfileEditForm";
import { UserProfileImage } from "./UserProfileImage";
import { userProfileStyleObj } from "./styleObject/userProfileStyleObj";

export const UserProfileInformation = ({ user }: { user: UserDataProps }) => {
  const [isFormEditingVisible, setIsFormEditingVisible] =
    useState<boolean>(false);
  const toggleFormEditing = () => {
    setIsFormEditingVisible(!isFormEditingVisible);
  };
  return (
    <View style={userProfileStyleObj.profileUserWrapper}>
      <Image source={{ uri: user.images.background }} style={{ height: 200 }} />
      <UserProfileImage user={user} />
      <View style={userProfileStyleObj.userInformation_container}>
        <View>
          <Text>{user.telephone}</Text>
          <Text>{user.email}</Text>
          <Text>{user.username}</Text>
        </View>
        <View>
          <Button
            title="Edit"
            disabled={isFormEditingVisible ? true : false}
            onPress={toggleFormEditing}
          />
        </View>
      </View>

      {isFormEditingVisible ? (
        <UserProfileEditForm
          uid={user.id}
          toggleFormEditing={toggleFormEditing}
        />
      ) : (
        ""
      )}
    </View>
  );
};
