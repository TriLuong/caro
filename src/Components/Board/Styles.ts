import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  txt: {
    textAlign: "center",
  },
  cell: {
    width: (width / 3) * 0.8,
    aspectRatio: 1,
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  check: {
    fontSize: 40,
  },
  txtHightLight: {
    color: "red",
    fontWeight: "bold",
  },
});
