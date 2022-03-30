import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AuthLayout from "../../components/auth/AuthLayout";
import DefaultImage from "../../components/ui/DefaultImage";
import FormInput from "../../components/ui/FormInput";
import TextButton from "../../components/ui/TextButton";
import { COLORS } from "../../constants/colors";
import { SIZES } from "../../constants/sizes";
import { AuthStackParamList } from "../../routes/AuthStack";
import { validateEmail } from "../../utils/utils";

type ForgotPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  "ForgotPassword"
>;

const ForgotPassword = (props: ForgotPasswordProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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
        </View>
        <TextButton
          containerStyle={{
            height: 55,
            alignItems: "center",
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor:
              email !== "" && emailError === ""
                ? COLORS.primary
                : COLORS.transparentPrimary,
          }}
          label={"Send Email"}
          labelStyle={{}}
          onPress={() => props.navigation.navigate("Otp", { email: email })}
          disabled={!(email !== "" && emailError === "")}
        />
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

export default ForgotPassword;
