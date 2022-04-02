import { DrawerScreenProps, useDrawerStatus } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useEffect } from "react";
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import Header from "../../components/navigation/Header";
import DefaultImage from "../../components/ui/DefaultImage";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";
import { SIZES } from "../../constants/sizes";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { MainDrawerParamList } from "../../routes/MainDrawer";
import { RootState, useAppDispatch } from "../../store/store";
import { setSelectedTab } from "../../store/tabSlice";

type HomeProps = DrawerScreenProps<MainDrawerParamList, "Home">;

const TabButton: FC<{
  label: string;
  icon: ImageSourcePropType;
  isFocus: boolean;
  onPress: () => void;
  outerContainerStyle: StyleProp<ViewStyle>;
  innerContainerStyle: StyleProp<ViewStyle>;
}> = (props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Animated.View
        style={[
          { flex: 1, alignItems: "center", justifyContent: "center" },
          props.outerContainerStyle,
        ]}
      >
        <Animated.View style={[styles.tabButton, props.innerContainerStyle]}>
          <DefaultImage
            source={props.icon}
            width={20}
            height={20}
            containerStyle={{ tintColor: COLORS.gray }}
          />
          {props.isFocus && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: COLORS.gray,
                ...FONTS.h3,
              }}
            >
              {props.label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const Home = (props: HomeProps) => {
  const { selectedTab } = useSelector((state: RootState) => state.tab);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedTab("home"));
  }, []);

  const isDrawerOpen = useDrawerStatus();
  const sv = useSharedValue(0);
  useUpdateEffect(() => {
    if (isDrawerOpen === "open") {
      sv.value = withTiming(1);
    } else {
      sv.value = withTiming(0);
    }
  }, [isDrawerOpen]);
  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(sv.value, [0, 1], [1, 0.8], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const borderRadius = interpolate(sv.value, [0, 1], [0, 20], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    return {
      transform: [{ scale: scale }],
      borderRadius,
      overflow: "hidden",
    };
  });

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);
  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(COLORS.white);
  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });

  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });

  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });

  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    };
  });

  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favouriteTabFlex.value,
    };
  });

  const favouriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favouriteTabColor.value,
    };
  });

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    };
  });

  const notificationColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: notificationTabColor.value,
    };
  });

  useEffect(() => {
    if (selectedTab === "home") {
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
    if (selectedTab === "cart") {
      cartTabFlex.value = withTiming(4, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      cartTabFlex.value = withTiming(1, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
    if (selectedTab === "favourite") {
      favouriteTabFlex.value = withTiming(4, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
    if (selectedTab === "search") {
      searchTabFlex.value = withTiming(4, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
    if (selectedTab === "notification") {
      notificationTabFlex.value = withTiming(4, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
  }, [selectedTab]);

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.white,
        },
        screenStyle,
      ]}
    >
      <Header
        containerStyle={{
          height: 50,
          paddingHorizontal: SIZES.padding,
          marginTop: 40,
          alignItems: "center",
        }}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => props.navigation.toggleDrawer()}
          >
            <DefaultImage
              source={require("../../../assets/images/menu.png")}
              width={20}
              height={20}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity style={styles.profileButton} onPress={() => {}}>
            <DefaultImage
              source={require("../../../assets/images/avatar.png")}
              width={40}
              height={40}
            />
          </TouchableOpacity>
        }
      />
      <View style={{ flex: 1 }}>
        <Text>Mainlayout</Text>
      </View>
      <View style={styles.footerContainer}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          style={styles.gradient}
        />
        <View style={styles.tabContainer}>
          <TabButton
            label={"Home"}
            icon={require("../../../assets/images/home.png")}
            isFocus={selectedTab === "home"}
            onPress={() => dispatch(setSelectedTab("home"))}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
          />
          <TabButton
            label={"Search"}
            icon={require("../../../assets/images/search.png")}
            isFocus={selectedTab === "search"}
            onPress={() => dispatch(setSelectedTab("search"))}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
          />
          <TabButton
            label={"Cart"}
            icon={require("../../../assets/images/cart.png")}
            isFocus={selectedTab === "cart"}
            onPress={() => dispatch(setSelectedTab("cart"))}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
          />
          <TabButton
            label={"Favourite"}
            icon={require("../../../assets/images/favourite.png")}
            isFocus={selectedTab === "favourite"}
            onPress={() => dispatch(setSelectedTab("favourite"))}
            outerContainerStyle={favouriteFlexStyle}
            innerContainerStyle={favouriteColorStyle}
          />
          <TabButton
            label={"Notfication"}
            icon={require("../../../assets/images/notification.png")}
            isFocus={selectedTab === "notification"}
            onPress={() => dispatch(setSelectedTab("notification"))}
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.radius,
  },
  profileButton: {
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  footerContainer: {
    height: 100,
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    top: -20,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabContainer: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: SIZES.radius,
    paddingBottom: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
  },
  tabButton: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
});

export default Home;
