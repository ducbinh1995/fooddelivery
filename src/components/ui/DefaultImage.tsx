import React, { FC } from "react";
import {
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

const DefaultImage: FC<{
  source: ImageSourcePropType;
  width: number;
  height: number;
  resizeMode?: ImageResizeMode;
  containerStyle?: StyleProp<ImageStyle>;
}> = (props) => {
  return (
    <Image
      style={[
        { width: props.width, height: props.height },
        props.containerStyle || {},
      ]}
      source={props.source}
      resizeMode={props.resizeMode || "contain"}
    />
  );
};

export default DefaultImage;
