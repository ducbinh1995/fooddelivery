import React, { FC } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { FONTS } from "../../constants/fonts";

const Header: FC<{
  containerStyle: StyleProp<ViewStyle>;
  title: string;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
}> = (props) => {
  return (
    <View style={[{ flexDirection: "row" }, props.containerStyle]}>
      {props.leftComponent}
      <View style={styles.titleContainer}>
        <Text style={{ ...FONTS.h3 }}>{props.title}</Text>
      </View>
      {props.rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
