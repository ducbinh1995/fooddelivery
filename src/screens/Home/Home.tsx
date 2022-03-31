import { DrawerScreenProps, useDrawerStatus } from "@react-navigation/drawer";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { COLORS } from "../../constants/colors";
import useUpdateEffect from "../../hooks/useUpdateEffect";
import { MainDrawerParamList } from "../../routes/MainDrawer";

type HomeProps = DrawerScreenProps<MainDrawerParamList, "Home">;

const Home = (props: HomeProps) => {
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

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: COLORS.white,
          justifyContent: "center",
          alignItems: "center",
        },
        screenStyle,
      ]}
    >
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      <Text>Mainlayout</Text>
    </Animated.View>
  );
};

export default Home;
