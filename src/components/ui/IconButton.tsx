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

const IconButton: FC<{
  containerStyle: StyleProp<ViewStyle>;
  onPress: () => void;
  icon: ImageSourcePropType;
  iconStyle: StyleProp<ImageStyle>;
}> = (props) => {
  const { debounce } = useDebounce();

  return (
    <TouchableOpacity
      style={props.containerStyle}
      onPress={() => debounce(props.onPress)}
      activeOpacity={0.5}
    >
      <DefaultImage
        source={props.icon}
        width={30}
        height={30}
        containerStyle={props.iconStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconButton;
