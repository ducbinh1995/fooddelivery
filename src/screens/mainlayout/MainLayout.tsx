import { DrawerScreenProps, useDrawerStatus } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useEffect, useRef } from "react";
import {
  FlatList,
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
  interpolateColor,
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

type MainLayoutProps = DrawerScreenProps<MainDrawerParamList, "MainLayout">;

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
            containerStyle={{
              tintColor: props.isFocus ? COLORS.white : COLORS.gray,
            }}
          />
          {props.isFocus && (
            <Text
              numberOfLines={1}
              style={{
                marginLeft: SIZES.base,
                color: props.isFocus ? COLORS.white : COLORS.gray,
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

const BOTTOM_TABS = [
  {
    id: "1",
    label: "home",
  },
  {
    id: "2",
    label: "search",
  },
  {
    id: "3",
    label: "cart",
  },
  {
    id: "4",
    label: "favourite",
  },
  {
    id: "5",
    label: "notification",
  },
];

const MainLayout = (props: MainLayoutProps) => {
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

  const flatlistRef = useRef<FlatList>(null);

  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(0);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(0);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(0);
  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(0);
  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(0);

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });

  const homeColorStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      homeTabColor.value,
      [0, 1],
      [COLORS.white, COLORS.primary]
    );
    return {
      backgroundColor: bgColor as string,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });

  const searchColorStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      searchTabColor.value,
      [0, 1],
      [COLORS.white, COLORS.primary]
    );
    return {
      backgroundColor: bgColor as string,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });

  const cartColorStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      cartTabColor.value,
      [0, 1],
      [COLORS.white, COLORS.primary]
    );
    return {
      backgroundColor: bgColor as string,
    };
  });

  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favouriteTabFlex.value,
    };
  });

  const favouriteColorStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      favouriteTabColor.value,
      [0, 1],
      [COLORS.white, COLORS.primary]
    );
    return {
      backgroundColor: bgColor as string,
    };
  });

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    };
  });

  const notificationColorStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      notificationTabColor.value,
      [0, 1],
      [COLORS.white, COLORS.primary]
    );
    return {
      backgroundColor: bgColor as string,
    };
  });

  useUpdateEffect(() => {
    if (selectedTab === "home") {
      flatlistRef.current?.scrollToIndex({
        index: 0,
        animated: false,
      });
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(1, { duration: 500 });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(0, { duration: 500 });
    }
    if (selectedTab === "search") {
      flatlistRef.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
      searchTabFlex.value = withTiming(4, { duration: 500 });
      searchTabColor.value = withTiming(1, { duration: 500 });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 500 });
      searchTabColor.value = withTiming(0, { duration: 500 });
    }
    if (selectedTab === "cart") {
      flatlistRef.current?.scrollToIndex({
        index: 2,
        animated: false,
      });
      cartTabFlex.value = withTiming(4, { duration: 500 });
      cartTabColor.value = withTiming(1, { duration: 500 });
    } else {
      cartTabFlex.value = withTiming(1, { duration: 500 });
      cartTabColor.value = withTiming(0, { duration: 500 });
    }
    if (selectedTab === "favourite") {
      flatlistRef.current?.scrollToIndex({
        index: 3,
        animated: false,
      });
      favouriteTabFlex.value = withTiming(4, { duration: 500 });
      favouriteTabColor.value = withTiming(1, { duration: 500 });
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 500 });
      favouriteTabColor.value = withTiming(0, { duration: 500 });
    }
    if (selectedTab === "notification") {
      flatlistRef.current?.scrollToIndex({
        index: 4,
        animated: false,
      });
      notificationTabFlex.value = withTiming(4, { duration: 500 });
      notificationTabColor.value = withTiming(1, { duration: 500 });
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 500 });
      notificationTabColor.value = withTiming(0, { duration: 500 });
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
      <FlatList
        ref={flatlistRef}
        horizontal
        scrollEnabled={false}
        pagingEnabled
        snapToAlignment="center"
        snapToInterval={SIZES.width}
        showsHorizontalScrollIndicator={false}
        data={BOTTOM_TABS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return (
            <View style={{ height: SIZES.height, width: SIZES.width }}>
              {item.label === "home" && <Text>Home</Text>}
              {item.label === "search" && <Text>Search</Text>}
              {item.label === "cart" && <Text>Cart</Text>}
              {item.label === "favourite" && <Text>Favourite</Text>}
              {item.label === "notification" && <Text>Notification</Text>}
            </View>
          );
        }}
      />
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

export default MainLayout;
