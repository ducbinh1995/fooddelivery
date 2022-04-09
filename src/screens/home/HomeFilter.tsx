import React, { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import IconButton from "../../components/ui/IconButton";
import TextButton from "../../components/ui/TextButton";
import TextIconButton from "../../components/ui/TextIconButton";
import TwoPointSlider from "../../components/ui/TwoPointSlider";
import { COLORS } from "../../constants/colors";
import { delivery_time, ratings, tags } from "../../constants/dummydata";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";

const Section: FC<{ containerStyle: StyleProp<ViewStyle>; title: string }> = (
  props
) => {
  return (
    <View style={[{ marginTop: SIZES.padding }, props.containerStyle]}>
      <Text style={{ ...FONTS.h3 }}>{props.title}</Text>
      {props.children}
    </View>
  );
};

const HomeFilter: FC<{ isVisible: boolean; onClose: () => void }> = (props) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  const [isShowing, setIsShowing] = useState(props.isVisible);
  const [deliveryTime, setDeliveryTime] = useState<number>(delivery_time[0].id);
  const [rating, setRating] = useState<number>(ratings[0].id);
  const [tag, setTag] = useState<number>(tags[0].id);

  useEffect(() => {
    if (isShowing) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        props.onClose();
      });
    }

    return () => {};
  }, [isShowing]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  const renderDistance = () => {
    return (
      <Section containerStyle={{}} title="Distance">
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            prefix={""}
            postfix={"km"}
            onValuesChange={() => {}}
          />
        </View>
      </Section>
    );
  };

  const renderDelivery = () => {
    return (
      <Section containerStyle={{ marginTop: 40 }} title="Delivery Time">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {delivery_time.map((item, index) => (
            <TextButton
              key={index.toString()}
              containerStyle={{
                width: "30%",
                height: 50,
                margin: 5,
                alignItems: "center",
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === deliveryTime ? COLORS.primary : COLORS.lightGray2,
              }}
              label={item.label}
              labelStyle={{
                color: item.id === deliveryTime ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              onPress={() => {
                setDeliveryTime(item.id);
              }}
            />
          ))}
        </View>
      </Section>
    );
  };

  const renderPricing = () => {
    return (
      <Section containerStyle={{}} title="Pricing Range">
        <View style={{ alignItems: "center" }}>
          <TwoPointSlider
            values={[10, 50]}
            min={1}
            max={100}
            prefix={"$"}
            postfix={""}
            onValuesChange={() => {}}
          />
        </View>
      </Section>
    );
  };

  const renderRating = () => {
    return (
      <Section containerStyle={{ marginTop: 40 }} title="Delivery Time">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {ratings.map((item, index) => (
            <TextIconButton
              key={index.toString()}
              containerStyle={{
                flex: 1,
                height: 50,
                margin: 5,
                alignItems: "center",
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === rating ? COLORS.primary : COLORS.lightGray2,
              }}
              label={item.label.toString()}
              labelStyle={{
                color: item.id === rating ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              onPress={() => {
                setRating(item.id);
              }}
              icon={require("../../../assets/images/star.png")}
              iconPosition={"right"}
              iconStyle={{
                tintColor: item.id === rating ? COLORS.white : COLORS.gray,
                marginLeft: 5,
              }}
            />
          ))}
        </View>
      </Section>
    );
  };

  const renderTag = () => {
    return (
      <Section containerStyle={{ marginTop: 40 }} title="Delivery Time">
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {tags.map((item, index) => (
            <TextButton
              key={index.toString()}
              containerStyle={{
                // width: "30%",
                height: 50,
                margin: 5,
                paddingHorizontal: SIZES.padding,
                alignItems: "center",
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === tag ? COLORS.primary : COLORS.lightGray2,
              }}
              label={item.label}
              labelStyle={{
                color: item.id === tag ? COLORS.white : COLORS.gray,
                ...FONTS.body3,
              }}
              onPress={() => {
                setTag(item.id);
              }}
            />
          ))}
        </View>
      </Section>
    );
  };

  return (
    <Modal>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        <TouchableWithoutFeedback onPress={() => setIsShowing(false)}>
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            left: 0,
            top: modalY,
            width: "100%",
            height: "100%",
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>
              Filter Your Search
            </Text>
            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              onPress={() => setIsShowing(false)}
              icon={require("../../../assets/images/cross.png")}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250,
            }}
          >
            {renderDistance()}
            {renderDelivery()}
            {renderPricing()}
            {renderRating()}
            {renderTag()}
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 150,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white,
            }}
          >
            <TextButton
              containerStyle={{
                // width: "30%",
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              label={"Apply Filter"}
              labelStyle={{}}
              onPress={() => {}}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({});

export default HomeFilter;
