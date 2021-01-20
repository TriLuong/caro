import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
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
  cell: {
    width: (width / 3) * 0.8,
    height: (width / 3) * 0.8,
    // backgroundColor: "red",
    borderWidth: 1,

    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },
  btn: {
    backgroundColor: "red",
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btnDisabled: {
    backgroundColor: "gray",
  },
  btnText: {
    color: "white",
    textAlign: "center",
  },
  check: {
    fontSize: 40,
  },
  txtHightLight: {
    color: "red",
    fontWeight: "bold",
  },
});
