import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignIn from "../screens/auth/SignIn";
import Onboarding from "../screens/onboarding/Onboarding";

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthStack;
