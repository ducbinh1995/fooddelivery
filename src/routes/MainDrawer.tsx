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
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";
import { SIZES } from "../constants/sizes";
import Home from "../screens/Home/Home";

export type MainDrawerParamList = {
  Home: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

const CustomDrawerItem: FC<{ label: string; icon: ImageSourcePropType }> = (
  props
) => {
  return (
    <TouchableOpacity style={styles.menuButton}>
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

const CustomDrawerContents: FC<{ navigation: DrawerNavigationHelpers }> = (
  props
) => {
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
          />
          <CustomDrawerItem
            label="My Wallet"
            icon={require("../../assets/images/wallet.png")}
          />
          <CustomDrawerItem
            label="Notification"
            icon={require("../../assets/images/notification.png")}
          />
          <CustomDrawerItem
            label="Favourite"
            icon={require("../../assets/images/favourite.png")}
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
          />
          <CustomDrawerItem
            label="Coupons"
            icon={require("../../assets/images/coupon.png")}
          />
          <CustomDrawerItem
            label="Settings"
            icon={require("../../assets/images/setting.png")}
          />
          <CustomDrawerItem
            label="Invite a friend"
            icon={require("../../assets/images/profile.png")}
          />
          <CustomDrawerItem
            label="Help Center"
            icon={require("../../assets/images/help.png")}
          />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: SIZES.padding,
            left: SIZES.radius,
          }}
        >
          <CustomDrawerItem
            label="Logout"
            icon={require("../../assets/images/logout.png")}
          />
        </View>
      </Animated.View>
    </DrawerContentScrollView>
  );
};

const MainDrawer = () => {
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
          return <CustomDrawerContents navigation={props.navigation} />;
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
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
