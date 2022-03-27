import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import {
  Animated,
  FlatList,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultImage from "../../components/ui/DefaultImage";
import TextButton from "../../components/ui/TextButton";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import { AuthStackParamList } from "../../routes/AuthStack";

interface OnboardingItem {
  id: number;
  backgroundImage: ImageSourcePropType;
  bannerImage: ImageSourcePropType;
  title: string;
  description: string;
}

const onboarding_screens: OnboardingItem[] = [
  {
    id: 1,
    backgroundImage: require("../../../assets/images/background_01.png"),
    bannerImage: require("../../../assets/images/favourite_food.png"),
    title: "Choose a Favourite Food",
    description:
      "When you oder Eat Steet, we’ll hook you up with exclusive coupon, specials and rewards",
  },
  {
    id: 2,
    backgroundImage: require("../../../assets/images/background_02.png"),
    bannerImage: require("../../../assets/images/hot_delivery.png"),
    title: "Hot Delivery to Home",
    description:
      "We make food ordering fasr, simple and free-no matter if you order online or cash",
  },
  {
    id: 3,
    backgroundImage: require("../../../assets/images/background_01.png"),
    bannerImage: require("../../../assets/images/great_food.png"),
    title: "Receive the Great Food",
    description:
      "You’ll receive the great food within a hour. And get free delivery credits for every order.",
  },
];

type OnboardingProps = NativeStackScreenProps<AuthStackParamList, "Onboarding">;

const Onboarding = (props: OnboardingProps) => {
  const flatlistRef = useRef<FlatList>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;
  const onChangeViewRef = useRef(
    (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
      setCurrentIndex(info.viewableItems[0].index || 0);
    }
  );

  const renderLogo = () => {
    return (
      <SafeAreaView edges={["top"]} style={styles.logoContainer}>
        <DefaultImage
          width={SIZES.width / 2}
          height={100}
          source={require("../../../assets/images/logo_02.png")}
        />
      </SafeAreaView>
    );
  };

  const renderListItem = (item: OnboardingItem) => {
    return (
      <View style={styles.itemContainer}>
        <View style={{ flex: 3 }}>
          <ImageBackground
            source={item.backgroundImage}
            style={[
              styles.itemBackground,
              { height: item.id === 2 ? "92%" : "100%" },
            ]}
          >
            <DefaultImage
              source={item.bannerImage}
              width={SIZES.width * 0.8}
              height={SIZES.width * 0.8}
              containerStyle={{ marginBottom: -SIZES.padding }}
            />
          </ImageBackground>
        </View>

        <View style={styles.itemDetail}>
          <Text style={styles.itemDetailTitle}>{item.title}</Text>
          <Text style={styles.itemDetailDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.footerDotContainer}>
          <Dots />
        </View>
        {currentIndex < onboarding_screens.length - 1 && (
          <View style={styles.footerButtonContainer}>
            <TextButton
              label="Skip"
              containerStyle={{
                backgroundColor: COLORS.transparent,
              }}
              labelStyle={{
                color: COLORS.darkGray2,
              }}
              onPress={() => console.log("skip")}
            />
            <TextButton
              label="Next"
              containerStyle={{
                height: 60,
                width: 200,
                borderRadius: SIZES.radius,
              }}
              labelStyle={{}}
              onPress={() => {
                let index = Math.ceil(
                  Number((scrollX as any)._value / SIZES.width)
                );
                if (index < onboarding_screens.length - 1) {
                  flatlistRef.current?.scrollToIndex({
                    index: index + 1,
                    animated: true,
                  });
                }
              }}
            />
          </View>
        )}
        {currentIndex === onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}
          >
            <TextButton
              label="Let's Get Started"
              containerStyle={{
                height: 60,
                borderRadius: SIZES.radius,
              }}
              labelStyle={{}}
              onPress={() => {
                props.navigation.navigate("SignIn");
              }}
            />
          </View>
        )}
      </View>
    );
  };

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotContainer}>
        {onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.lightOrange,
              COLORS.primary,
              COLORS.lightOrange,
            ],
            extrapolate: "clamp",
          });

          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor: dotColor },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderLogo()}
      <Animated.FlatList
        ref={flatlistRef}
        horizontal
        pagingEnabled
        data={onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment={"center"}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderListItem(item)}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onChangeViewRef.current}
      />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    position: "absolute",
    top: 25,
    alignSelf: "center",
  },
  itemContainer: {
    width: SIZES.width,
  },
  itemBackground: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: "100%",
  },
  itemDetail: {
    flex: 1,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SIZES.radius,
  },
  itemDetailTitle: {
    ...FONTS.h1,
    fontSize: 25,
  },
  itemDetailDescription: {
    marginTop: SIZES.radius,
    textAlign: "center",
    color: COLORS.darkGray,
    paddingHorizontal: SIZES.padding,
    ...FONTS.body3,
  },
  footerContainer: {
    height: 160,
  },
  footerDotContainer: {
    flex: 1,
    justifyContent: "center",
  },
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    borderRadius: 5,
    marginHorizontal: 6,
    height: 10,
    backgroundColor: COLORS.primary,
  },
  footerButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
  },
});

export default Onboarding;
