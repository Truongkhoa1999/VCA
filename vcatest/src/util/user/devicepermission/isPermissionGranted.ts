import { PermissionResult } from "@/types/permission/hardwarePermission.ts/hardwarPermission";
import { PermissionStatus } from "react-native";
import Permissions, { PERMISSIONS } from "react-native-permissions";

//check permission hub

export const checkPermissionHub = (permissionType: string) => {
  switch (permissionType) {
    case "microphone":
      checkPermissionMicrophone();
  }
};

export const requestPermissionHub = (permissionType: string) => {
    switch (permissionType) {
        case "microphone":
          requestPermissionForMicrophone();
      }
}

 const checkPermissionMicrophone =
  async () => {
    const result: PermissionResult = await Permissions.check(
      PERMISSIONS.IOS.MICROPHONE
    );
    return result;
  };

  export const requestPermissionForMicrophone = async () => {
      const request: PermissionResult = await Permissions.request(PERMISSIONS.IOS.MICROPHONE);
  }


