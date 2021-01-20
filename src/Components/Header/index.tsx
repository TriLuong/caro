import React from "react";
import { Text, View } from "react-native";
import { IHeaderProps } from "../../Types";
import { styles } from "./Styles";

const Header = ({
  winner,
  player,
  player1Score,
  player2Score,
}: IHeaderProps) => {
  return (
    <View>
      <View style={styles.header}>
        <View style={[styles.containerPlayer]}>
          <Text style={[styles.txt, styles.txtWinner, { paddingBottom: 5 }]}>
            {winner === 3 && "DRAW"}
          </Text>
        </View>
      </View>

      <View style={styles.header}>
        <View style={[styles.containerPlayer, { borderRightWidth: 1 }]}>
          <Text style={[styles.txt, styles.txtWinner, { paddingBottom: 5 }]}>
            {winner === 1 && "WINNER"}
          </Text>
          <Text style={[styles.txt, player === 1 && styles.txtHightLight]}>
            Player 1 (X)
          </Text>
          <Text style={[styles.txt, { marginTop: 5 }]}>
            <Text style={styles.txt}>{`Score: `}</Text>
            <Text
              style={[styles.txt, { fontWeight: "bold" }]}
            >{`${player1Score}`}</Text>
          </Text>
        </View>
        <View style={styles.containerPlayer}>
          <Text style={[styles.txt, styles.txtWinner, { paddingBottom: 5 }]}>
            {winner === 2 && "WINNER"}
          </Text>
          <Text style={[styles.txt, player === 2 && styles.txtHightLight]}>
            Player 2 (0)
          </Text>
          <Text style={[styles.txt, { marginTop: 5 }]}>
            <Text style={styles.txt}>{`Score: `}</Text>
            <Text
              style={[styles.txt, { fontWeight: "bold" }]}
            >{`${player2Score}`}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
