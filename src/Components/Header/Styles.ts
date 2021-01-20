import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerPlayer: {
    flex: 1,
  },
  txt: {
    textAlign: "center",
  },
  txtHightLight: {
    fontWeight: "bold",
  },
  txtWinner: {
    fontSize: 20,
    color: "red",
    fontWeight: "bold",
  },
});
