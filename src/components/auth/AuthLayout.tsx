import React, { FC } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import DefaultImage from "../ui/DefaultImage";

const AuthLayout: FC<{
  title: string;
  subTitle: string;
  titleContainerStyle: StyleProp<TextStyle>;
}> = (props) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.scrollViewContainer}
      >
        <View style={styles.logoContainer}>
          <DefaultImage
            source={require("../../../assets/images/logo_02.png")}
            width={200}
            height={100}
          />
        </View>
        <View style={[styles.titleContainer, props.titleContainerStyle]}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.subTitle}>{props.subTitle}</Text>
        </View>
        {props.children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  scrollViewContainer: {
    // flex: 1,
    paddingHorizontal: SIZES.padding,
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    alignItems: "center",
  },
  titleContainer: {
    marginTop: SIZES.padding,
  },
  title: {
    textAlign: "center",
    ...FONTS.h2,
  },
  subTitle: {
    textAlign: "center",
    color: COLORS.darkGray,
    marginTop: SIZES.base,
    ...FONTS.body3,
  },
});

export default AuthLayout;
