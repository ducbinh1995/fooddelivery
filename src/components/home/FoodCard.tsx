import React, { FC } from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import { MenuDetail } from "../../model/Menu";
import DefaultImage from "../ui/DefaultImage";

const FoodCard: FC<{
  containerStyle: StyleProp<ViewStyle>;
  imageWidth: number;
  imageHeight: number;
  imageStyle: StyleProp<ImageStyle>;
  onPress: () => void;
  item: MenuDetail;
  vertical?: boolean;
}> = (props) => {
  if (props.vertical) {
    return (
      <TouchableOpacity
        style={[styles.verticalButtonContainer, props.containerStyle]}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <DefaultImage
              width={30}
              height={30}
              source={require("../../../assets/images/calories.png")}
            />
            <Text style={{ ...FONTS.body5, color: COLORS.darkGray2 }}>
              {props.item.calories} Calories
            </Text>
          </View>
          <DefaultImage
            width={20}
            height={20}
            source={require("../../../assets/images/love.png")}
            containerStyle={{
              tintColor: props.item.isFavourite ? COLORS.primary : COLORS.gray,
            }}
          />
        </View>
        <View
          style={{
            height: 150,
            width: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DefaultImage
            width={150}
            height={150}
            source={props.item.image}
          />
        </View>
        <View style={{ alignItems: "center", marginTop: -20 }}>
          <Text style={{ ...FONTS.h3, textAlign: 'center' }}>{props.item.name}</Text>
          <Text style={{ ...FONTS.body4, color: COLORS.darkGray2, textAlign: 'center' }}>
            {props.item.description}
          </Text>
          <Text style={{ ...FONTS.h2, marginTop: SIZES.base }}>
            ${props.item.price}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.horizontalButtonContainer, props.containerStyle]}
    >
      <DefaultImage
        width={props.imageWidth}
        height={props.imageHeight}
        source={props.item.image}
        containerStyle={props.imageStyle}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ ...FONTS.h3, fontSize: 17 }}>{props.item.name}</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.darkGray2 }}>
          {props.item.description}
        </Text>
        <Text style={{ ...FONTS.h2, marginTop: SIZES.base }}>
          ${props.item.price}
        </Text>
      </View>
      <View style={styles.caloriesContainer}>
        <DefaultImage
          source={require("../../../assets/images/calories.png")}
          width={30}
          height={30}
        />
        <Text style={{ ...FONTS.body5, color: COLORS.darkGray2 }}>
          {props.item.calories} Calories
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.radius,
  },
  verticalButtonContainer: {
    width: 200,
    padding: SIZES.radius,
    alignItems: "center",
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },
  horizontalButtonContainer: {
    flexDirection: "row",
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    alignItems: "center",
  },
  caloriesContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 5,
    right: SIZES.radius,
  },
});

export default FoodCard;
