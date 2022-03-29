import React, { FC } from "react";
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { useDebounce } from "../../hooks/useDebounce";
import DefaultImage from "./DefaultImage";

const TextIconButton: FC<{
  containerStyle: StyleProp<ViewStyle>;
  label: string;
  labelStyle: StyleProp<TextStyle>;
  onPress: () => void;
  icon: ImageSourcePropType;
  iconPosition: "left" | "right";
  iconStyle: StyleProp<ImageStyle>;
}> = (props) => {
  const { debounce } = useDebounce();

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={() => debounce(props.onPress)}
      activeOpacity={0.5}
    >
      {props.iconPosition === "left" && (
        <DefaultImage
          source={props.icon}
          width={20}
          height={20}
          containerStyle={props.iconStyle}
        />
      )}
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
      {props.iconPosition === "right" && (
        <DefaultImage
          source={props.icon}
          width={20}
          height={20}
          containerStyle={props.iconStyle}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  label: {
    color: COLORS.white,
    ...FONTS.body3,
  },
});

export default TextIconButton;
