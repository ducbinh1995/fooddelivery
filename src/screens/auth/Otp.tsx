import OTPInputView from "@twotalltotems/react-native-otp-input";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthLayout from "../../components/auth/AuthLayout";
import TextButton from "../../components/ui/TextButton";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";

const Otp = () => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let countdown = setInterval(() => {
      setTimer((prevState) => {
        if (prevState > 0) {
          return prevState - 1;
        } else {
          return prevState;
        }
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  return (
    <View style={styles.container}>
      <AuthLayout
        title={"OTP Authentication"}
        subTitle={"An authentication code has been sent to your mail"}
        titleContainerStyle={{
          marginTop: SIZES.padding * 2,
        }}
      >
        <View style={styles.otpContainer}>
          <OTPInputView
            pinCount={4}
            style={{ width: "100%", height: 50 }}
            autoFocusOnLoad={false}
            codeInputFieldStyle={{
              width: 65,
              height: 65,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              color: COLORS.black,
              ...FONTS.h3,
            }}
            onCodeFilled={(code) => {
              console.log(code);
            }}
          />
          <View style={styles.countDownContainer}>
            <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
              Didn't receive code
            </Text>
            <TextButton
              label={`Resend (${timer}s)`}
              disabled={timer === 0}
              containerStyle={{
                marginLeft: SIZES.base,
                backgroundColor: COLORS.transparent,
              }}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.h3,
              }}
              onPress={() => setTimer(60)}
            />
          </View>
        </View>
        <View>
          <TextButton
            containerStyle={{
              height: 50,
              alignItems: "center",
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.primary,
            }}
            label={"Continue"}
            labelStyle={{ ...FONTS.h3 }}
            onPress={() => {}}
          />
          <View style={{ marginTop: SIZES.padding, alignItems: "center" }}>
            <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
              By signing up, you agree to our.
            </Text>
            <TextButton
              containerStyle={{
                backgroundColor: COLORS.transparent,
              }}
              label={"Terms and Conditions"}
              labelStyle={{ color: COLORS.primary, ...FONTS.body3 }}
              onPress={() => {}}
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
  otpContainer: {
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  countDownContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.padding,
  },
  footerContainer: {},
});

export default Otp;
