import React, { FC } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";

const DefaultSwitch: FC<{
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => props.onChange(!props.value)}>
      <View style={{ flexDirection: "row" }}>
        <View style={props.value ? styles.onContainer : styles.offContainer}>
          <View
            style={{
              ...styles.dot,
              backgroundColor: props.value ? COLORS.white : COLORS.gray,
            }}
          />
        </View>
        <Text
          style={{
            color: props.value ? COLORS.primary : COLORS.gray,
            marginLeft: SIZES.base,
            ...FONTS.body4,
          }}
        >
          {props.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  onContainer: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  offContainer: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.gray,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default DefaultSwitch;
