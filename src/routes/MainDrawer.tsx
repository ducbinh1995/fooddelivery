import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import React, { FC } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { SIZES } from "../constants/sizes";
import MainLayout from "../screens/mainlayout/MainLayout";
import { RootState, useAppDispatch } from "../store/store";
import { setSelectedTab } from "../store/tabSlice";

export type MainDrawerParamList = {
  MainLayout: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const CustomDrawerItem: FC<{
  label: string;
  icon: ImageSourcePropType;
  isFocus: boolean;
  onSelect: () => void;
}> = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.menuButton,
        {
          backgroundColor: props.isFocus
            ? COLORS.transparentBlack1
            : COLORS.transparent,
        },
      ]}
      onPress={props.onSelect}
    >
      <Image
        style={{ width: 20, height: 20, tintColor: COLORS.white }}
        source={props.icon}
      />
      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContents: FC<{
  navigation: DrawerNavigationHelpers;
  selectedTab: string;
  onPressTab: (tab: string) => void;
}> = (props) => {
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}
    >
      <Animated.View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.radius,
        }}
      >
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => props.navigation.closeDrawer()}
        >
          <Image
            source={require("../../assets/images/cross.png")}
            style={{
              width: 35,
              height: 35,
              tintColor: COLORS.white,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={require("../../assets/images/avatar.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: SIZES.radius,
            }}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              ByProgrammers
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>
              View your profile
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          <CustomDrawerItem
            label="Home"
            icon={require("../../assets/images/home.png")}
            isFocus={props.selectedTab === "home"}
            onSelect={() => {
              props.onPressTab("home");
              props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="My Wallet"
            icon={require("../../assets/images/wallet.png")}
            isFocus={props.selectedTab === "wallet"}
            onSelect={() => {
              props.onPressTab("wallet");
              // props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="Notification"
            icon={require("../../assets/images/notification.png")}
            isFocus={props.selectedTab === "notifcation"}
            onSelect={() => {
              props.onPressTab("notifcation");
              // props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="Favourite"
            icon={require("../../assets/images/favourite.png")}
            isFocus={props.selectedTab === "favorite"}
            onSelect={() => {
              props.onPressTab("favorite");
              // props.navigation.navigate("Home");
            }}
          />
          <View
            style={{
              height: 1,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS.lightGray1,
            }}
          />
          <CustomDrawerItem
            label="Track Your Order"
            icon={require("../../assets/images/location.png")}
            isFocus={props.selectedTab === "location"}
            onSelect={() => {
              props.onPressTab("location");
              // props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="Coupons"
            icon={require("../../assets/images/coupon.png")}
            isFocus={props.selectedTab === "coupon"}
            onSelect={() => {
              props.onPressTab("coupon");
              // props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="Settings"
            icon={require("../../assets/images/setting.png")}
            isFocus={props.selectedTab === "setting"}
            onSelect={() => {
              props.onPressTab("setting");
              // props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="Invite a friend"
            icon={require("../../assets/images/profile.png")}
            isFocus={props.selectedTab === "profile"}
            onSelect={() => {
              props.onPressTab("profile");
              // props.navigation.navigate("Home");
            }}
          />
          <CustomDrawerItem
            label="Help Center"
            icon={require("../../assets/images/help.png")}
            isFocus={props.selectedTab === "help"}
            onSelect={() => {
              props.onPressTab("help");
              // props.navigation.navigate("Home");
            }}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: SIZES.padding,
            left: SIZES.radius,
            width: "100%",
          }}
        >
          <CustomDrawerItem
            label="Logout"
            icon={require("../../assets/images/logout.png")}
            isFocus={props.selectedTab === "logout"}
            onSelect={() => {
              props.onPressTab("logout");
              // props.navigation.navigate("Home");
            }}
          />
        </View>
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const MainDrawer = () => {
  const { selectedTab } = useSelector((state: RootState) => state.tab);
  const dispatch = useAppDispatch();

  const onPressTab = (tab: string) => {
    dispatch(setSelectedTab(tab));
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "slide",
          overlayColor: COLORS.transparent,
          drawerStyle: styles.drawer,
          sceneContainerStyle: { backgroundColor: COLORS.transparent },
        }}
        drawerContent={(props) => {
          return (
            <CustomDrawerContents
              navigation={props.navigation}
              selectedTab={selectedTab}
              onPressTab={onPressTab}
            />
          );
        }}
      >
        <Drawer.Screen
          name="MainLayout"
          component={MainLayout}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    width: "65%",
    paddingRight: 20,
    backgroundColor: COLORS.transparent,
  },
  closeButton: {
    height: 50,
    width: 50,
    backgroundColor: COLORS.transparent,
    justifyContent: "center",
  },
  profileContainer: {
    flexDirection: "row",
    marginTop: SIZES.radius,
    alignItems: "center",
  },
  menuButton: {
    flexDirection: "row",
    height: 40,
    marginBottom: SIZES.base,
    alignItems: "center",
    paddingLeft: SIZES.radius,
    borderRadius: SIZES.base,
  },
});

export default MainDrawer;
