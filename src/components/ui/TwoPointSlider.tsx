import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";

const TwoPointSlider: FC<{
  values: number[];
  min: number;
  max: number;
  prefix: string;
  postfix: string;
  onValuesChange: (v: number[]) => void;
}> = (props) => {
  return (
    <MultiSlider
      values={props.values}
      sliderLength={SIZES.width - SIZES.padding * 2 - 20}
      min={props.min}
      max={props.max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{ backgroundColor: COLORS.primary }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      customMarker={(e) => {
        return (
          <View
            style={{
              height: 60,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderWidth: 4,
                borderColor: COLORS.white,
                backgroundColor: COLORS.primary,
                ...styles.shadow,
              }}
            />
            <Text
              style={{ marginTop: 5, color: COLORS.darkGray, ...FONTS.body3 }}
            >
              {props.prefix}
              {e.currentValue} {props.postfix}
            </Text>
          </View>
        );
      }}
      onValuesChange={(values) => props.onValuesChange(values)}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});

export default TwoPointSlider;
