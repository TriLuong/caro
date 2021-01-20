import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { IBoardProps } from "../../Types";
import { styles } from "./Styles";

const Board = ({
  row,
  column,
  player1Move,
  player2Move,
  moveWinner,
  onMove,
}: IBoardProps) => {
  const rowArr = Array.from(Array(row));
  const columnArr = Array.from(Array(column));

  return (
    <View style={styles.container}>
      {columnArr.map((row, y) => {
        return (
          <View key={`row-${y}`}>
            {rowArr.map((col, x) => {
              let cellOfPlayer = 0;

              player1Move.forEach((p1) => {
                if (p1.x === x && p1.y === y) {
                  cellOfPlayer = 1;
                  return;
                }
              });
              player2Move.forEach((p2) => {
                if (p2.x === x && p2.y === y) {
                  cellOfPlayer = 2;
                  return;
                }
              });

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={`col-${x}`}
                  style={styles.cell}
                  onPress={() => onMove({ x, y }, cellOfPlayer === 0)}
                >
                  <Text
                    style={[
                      styles.check,
                      moveWinner.findIndex(
                        (itm) => itm.x === x && itm.y === y
                      ) >= 0 && styles.txtHightLight,
                    ]}
                  >
                    {cellOfPlayer === 1 ? "X" : cellOfPlayer === 2 ? "O" : ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Board;
