import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IButtonProps } from "../../Types";

import { styles } from "./Styles";

const Button = ({ onPress, text, disabled, style, ...rest }: IButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.btn, style, disabled && styles.btnDisabled]}
        {...rest}
      >
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
