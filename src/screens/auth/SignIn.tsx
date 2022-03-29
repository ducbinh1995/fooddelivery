import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthLayout from "../../components/auth/AuthLayout";
import DefaultImage from "../../components/ui/DefaultImage";
import DefaultSwitch from "../../components/ui/DefaultSwitch";
import FormInput from "../../components/ui/FormInput";
import TextButton from "../../components/ui/TextButton";
import TextIconButton from "../../components/ui/TextIconButton";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import { validateEmail, validatePassword } from "../../utils/utils";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveMe, setSaveMe] = useState(false);

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
            label={"Password"}
            autoCompeleteType="password"
            placeholder={""}
            inputStyle={{}}
            onChange={(value) => {
              validatePassword(value, () => {});
              setPassword(value);
            }}
            secureTextEntry={!showPassword}
            errorMsg={""}
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
          <View style={styles.saveMeContainer}>
            <DefaultSwitch
              value={saveMe}
              onChange={setSaveMe}
              label={"Save me"}
            />
            <TextButton
              containerStyle={{ backgroundColor: COLORS.transparent }}
              label={"Forgot Password?"}
              labelStyle={{ color: COLORS.gray, ...FONTS.body4 }}
              onPress={() => {}}
            />
          </View>
          <TextButton
            containerStyle={{
              height: 55,
              alignItems: "center",
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor:
                email !== "" && password !== "" && emailError === ""
                  ? COLORS.primary
                  : COLORS.transparentPrimary,
            }}
            label={"Sign In"}
            labelStyle={{}}
            onPress={() => {}}
            disabled={!(email !== "" && password !== "" && emailError === "")}
          />
          <View style={[styles.saveMeContainer, { justifyContent: "center" }]}>
            <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
              Don't have an account?
            </Text>
            <TextButton
              containerStyle={{ backgroundColor: COLORS.transparent }}
              label={" Signup"}
              labelStyle={{ color: COLORS.primary, ...FONTS.h3 }}
              onPress={() => {}}
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

export default SignIn;
