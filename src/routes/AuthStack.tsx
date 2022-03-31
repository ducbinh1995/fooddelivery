import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ForgotPassword from "../screens/auth/ForgotPassword";
import Otp from "../screens/auth/Otp";
import SignIn from "../screens/auth/SignIn";
import Signup from "../screens/auth/Signup";
import Onboarding from "../screens/onboarding/Onboarding";
import MainDrawer from "./MainDrawer";

export type AuthStackParamList = {
  Onboarding: undefined;
  SignIn: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Otp: {
    email: string;
  };
  MainDrawer: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
    </Stack.Navigator>
  );
};

export default AuthStack;
