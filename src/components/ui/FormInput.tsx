import React, { FC } from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";

const FormInput: FC<{
  containerStyle: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  inputStyle: StyleProp<ViewStyle>;
  prependComponent?: JSX.Element;
  appendComponent?: JSX.Element;
  onChange: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCompeleteType?: any;
  autoCapitalize?: any;
  errorMsg: string;
}> = (props) => {
  return (
    <View style={[props.containerStyle]}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{props.label}</Text>
        <Text style={styles.error}>{props.errorMsg}</Text>
      </View>
      <View style={styles.inputContainer}>
        {props.prependComponent}
        <TextInput
          style={[{ flex: 1 }, props.inputStyle]}
          placeholder={props.placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={props.secureTextEntry || false}
          keyboardType={props.keyboardType || "default"}
          autoCompleteType={props.autoCompeleteType || "off"}
          autoCapitalize={props.autoCapitalize || "none"}
          onChangeText={(text) => props.onChange(text)}
        />
        {props.appendComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
  error: {
    color: COLORS.red,
    ...FONTS.body4,
  },
  inputContainer: {
    flexDirection: "row",
    height: 55,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.base,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
});

export default FormInput;
