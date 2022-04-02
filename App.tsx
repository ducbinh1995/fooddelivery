import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import AuthStack from "./src/routes/AuthStack";
import { store } from "./src/store/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
