import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from "react-native-paper";

const preferedTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#7bc5ea",
    secondaryContainer: "#e1dfff",
  },
};
export default function RootLayout() {
  return (
    <PaperProvider theme={preferedTheme}>
      <Stack />
    </PaperProvider>
  );
}
