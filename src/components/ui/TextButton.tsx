import React, { FC } from "react";
import {
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

const TextButton: FC<{
  containerStyle: StyleProp<ViewStyle>;
  label: string;
  labelStyle: StyleProp<TextStyle>;
  onPress: () => void;
}> = (props) => {
  const { debounce } = useDebounce();

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={() => debounce(props.onPress)}
      activeOpacity={0.5}
    >
      <Text style={[styles.label, props.labelStyle]}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
  },
  label: {
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default TextButton;
