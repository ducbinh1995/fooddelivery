import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthLayout from "../../components/auth/AuthLayout";
import DefaultImage from "../../components/ui/DefaultImage";
import FormInput from "../../components/ui/FormInput";
import TextButton from "../../components/ui/TextButton";
import TextIconButton from "../../components/ui/TextIconButton";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import { AuthStackParamList } from "../../routes/AuthStack";
import { validateEmail, validatePassword } from "../../utils/utils";

type SignupProps = NativeStackScreenProps<AuthStackParamList, "Signup">;

const Signup = (props: SignupProps) => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <AuthLayout
        title={"Let's Sign You In"}
        subTitle={"Welcome back, you've been missed"}
        titleContainerStyle={{}}
      >
        <View style={styles.inputContainer}>
          <FormInput
            containerStyle={{}}
            label={"Email"}
            keyboardType="email-address"
            autoCompeleteType="email"
            placeholder={""}
            inputStyle={{}}
            onChange={(value) => {
              validateEmail(value, setEmailError);
              setEmail(value);
            }}
            errorMsg={emailError}
            appendComponent={
              <View style={{ justifyContent: "center" }}>
                <DefaultImage
                  source={
                    email === "" || (email !== "" && emailError === "")
                      ? require("../../../assets/images/correct.png")
                      : require("../../../assets/images/cancel.png")
                  }
                  height={20}
                  width={20}
                  containerStyle={{
                    tintColor:
                      email === ""
                        ? COLORS.gray
                        : email !== "" && emailError === ""
                        ? COLORS.green
                        : COLORS.red,
                  }}
                />
              </View>
            }
          />
          <FormInput
            containerStyle={{ marginTop: SIZES.radius }}
            label={"Username"}
            keyboardType="default"
            placeholder={""}
            inputStyle={{}}
            onChange={setUserName}
            errorMsg={""}
            appendComponent={
              <View style={{ justifyContent: "center" }}>
                <DefaultImage
                  source={require("../../../assets/images/correct.png")}
                  height={20}
                  width={20}
                  containerStyle={{
                    tintColor: userName === "" ? COLORS.gray : COLORS.green,
                  }}
                />
              </View>
            }
          />
          <FormInput
            containerStyle={{ marginTop: SIZES.radius }}
            label={"Password"}
            autoCompeleteType="password"
            placeholder={""}
            inputStyle={{}}
            onChange={(value) => {
              validatePassword(value, setPasswordError);
              setPassword(value);
            }}
            secureTextEntry={!showPassword}
            errorMsg={passwordError}
            appendComponent={
              <TouchableOpacity
                style={styles.showPasswordContainer}
                onPress={() => setShowPassword(!showPassword)}
              >
                <DefaultImage
                  source={
                    showPassword
                      ? require("../../../assets/images/eye_close.png")
                      : require("../../../assets/images/eye.png")
                  }
                  height={20}
                  width={20}
                  containerStyle={{ tintColor: COLORS.gray }}
                />
              </TouchableOpacity>
            }
          />
          <TextButton
            containerStyle={{
              height: 55,
              alignItems: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor:
                email !== "" &&
                password !== "" &&
                emailError === "" &&
                userName !== "" &&
                passwordError === ""
                  ? COLORS.primary
                  : COLORS.transparentPrimary,
            }}
            label={"Sign Up"}
            labelStyle={{}}
            onPress={() => {}}
            disabled={
              !(
                email !== "" &&
                password !== "" &&
                emailError === "" &&
                userName !== "" &&
                passwordError === ""
              )
            }
          />
          <View style={[styles.saveMeContainer, { justifyContent: "center" }]}>
            <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
              Already have an account?
            </Text>
            <TextButton
              containerStyle={{ backgroundColor: COLORS.transparent }}
              label={" Sign in"}
              labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
              onPress={() => props.navigation.navigate("SignIn")}
            />
          </View>
          <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <TextIconButton
              containerStyle={{
                height: 50,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.blue,
              }}
              label={"Login with Facebook"}
              labelStyle={{ color: COLORS.white }}
              onPress={() => {}}
              icon={require("../../../assets/images/fb.png")}
              iconPosition={"left"}
              iconStyle={{ marginRight: 5, tintColor: COLORS.white }}
            />
            <TextIconButton
              containerStyle={{
                marginTop: SIZES.radius,
                height: 50,
                alignItems: "center",
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2,
              }}
              label={"Login with Google"}
              labelStyle={{ color: COLORS.black }}
              onPress={() => {}}
              icon={require("../../../assets/images/google.png")}
              iconPosition={"left"}
              iconStyle={{ marginRight: 5 }}
            />
          </View>
        </View>
      </AuthLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  inputContainer: {
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  showPasswordContainer: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  saveMeContainer: {
    flexDirection: "row",
    marginTop: SIZES.radius,
    justifyContent: "space-between",
  },
});

export default Signup;
