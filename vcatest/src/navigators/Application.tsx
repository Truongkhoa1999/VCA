// React
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { useTheme } from "@/theme";
// Types
import type { ApplicationStackParamList } from "@/types/navigation";
// Screens + Components
import { UserProfile } from "@/screens";
import Login from "@/components/login/login";
import Home from "@/components/home/home";
import Register from "@/components/register/register";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  const { variant, navigationTheme } = useTheme();
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="AudioRecorder" component={AudioRecorder} /> */}
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
