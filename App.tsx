import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const ROW = 3;
const COLUMN = 3;

interface IPosition {
  x: number;
  y: number;
}

export default function App() {
  const rowArr = Array.from(Array(ROW));
  const columnArr = Array.from(Array(COLUMN));

  const [player, setPlayer] = useState(1);
  const [player1Move, setPlayer1Move] = useState<IPosition[]>([]);
  const [player2Move, setPlayer2Move] = useState<IPosition[]>([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const [winner, setWinner] = useState<any>(null);
  const [totalCheck, setTotalCheck] = useState(0);

  const onCheck = (x: number, y: number, isEmpty: boolean) => {
    if (isEmpty && !winner) {
      const newTotalCheck = totalCheck + 1;
      setTotalCheck(newTotalCheck);

      if (player === 1) {
        const newPlayer1Check = [...player1Move];
        newPlayer1Check.push({ x, y });
        setPlayer1Move(newPlayer1Check);

        detectWinner(newPlayer1Check, player, newTotalCheck);
      } else {
        const newPlayer2Check = [...player2Move];
        newPlayer2Check.push({ x, y });
        setPlayer2Move(newPlayer2Check);

        detectWinner(newPlayer2Check, player, newTotalCheck);
      }

      const newPlayer = player === 1 ? 2 : 1;

      setPlayer(newPlayer);
    }
  };

  const detectWinner = (
    playerCheck: IPosition[],
    currentPlayer: number,
    totalMove: number
  ) => {
    //Check Row
    let rowCheck = 0;
    let numberOfRow = 0;
    let numberOfCross1 = 0;
    let numberOfCross2 = 0;

    let columnCheck = 0;
    let numberOfColumn = 0;

    playerCheck.forEach((item, index) => {
      //Check row, column
      if (index === 0) {
        numberOfRow = 1;
        numberOfColumn = 1;
        rowCheck = item.x;
        columnCheck = item.y;
      } else {
        if (rowCheck === item.x) {
          numberOfRow++;
        }
        if (columnCheck === item.y) {
          numberOfColumn++;
        }
      }

      if (item.x === item.y) {
        numberOfCross1++;
        //center
        if (item.x === Math.floor(ROW / 2) && item.y === Math.floor(ROW / 2)) {
          numberOfCross2++;
        }
      }

      //CheckCross
      if (
        (item.x === 0 || item.x === ROW - 1) &&
        (item.y === 0 || item.y === COLUMN - 1) &&
        item.x !== item.y &&
        Math.abs(item.x - item.y) === ROW - 1
      ) {
        numberOfCross2++;
      }
    });

    console.log("totalMove", totalMove, ROW * COLUMN);

    if (
      numberOfColumn === 3 ||
      numberOfRow === 3 ||
      numberOfCross1 === 3 ||
      numberOfCross2 === 3
    ) {
      setWinner(currentPlayer);
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }
    } else if (totalMove === ROW * COLUMN) {
      console.log("DRAW");
      setWinner(3);
    }
  };

  const onNewGame = () => {
    setPlayer1Move([]);
    setPlayer2Move([]);
    setPlayer(1);
    setWinner(null);
    setTotalCheck(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  const onContinue = () => {
    setPlayer1Move([]);
    setPlayer2Move([]);
    setPlayer(1);
    setWinner(null);
    setTotalCheck(0);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={{ marginVertical: 20 }}>
        <Text>*** Score: </Text>
        <Text style={{ marginLeft: 5 }}>{`Player 1 (X): ${player1Score}`}</Text>
        <Text style={{ marginLeft: 5 }}>{`Player 2 (0): ${player2Score}`}</Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <Text style={{ marginLeft: 5 }}>
          <Text>{`Turn of Player: `}</Text>
          <Text style={styles.txtHightLight}>{`${player} (${
            player === 1 ? "X" : "O"
          })`}</Text>
        </Text>
      </View>

      <View>
        <Text>
          <Text>{`Result: `}</Text>
          <Text style={styles.txtHightLight}>
            {winner && winner !== 3
              ? `Player ${winner} WIN`
              : winner === 3
              ? `Draw`
              : ``}
          </Text>
        </Text>
      </View>

      <View style={{ marginVertical: 20 }}>
        <TouchableOpacity
          disabled={!winner}
          onPress={onContinue}
          style={[styles.btn, !winner && styles.btnDisabled]}
        >
          <Text style={styles.btnText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={!winner}
          onPress={onNewGame}
          style={[styles.btn, !winner && styles.btnDisabled]}
        >
          <Text style={styles.btnText}>New game</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
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
                    key={`col-${x}`}
                    style={styles.cell}
                    onPress={() => onCheck(x, y, cellOfPlayer === 0)}
                  >
                    <Text style={styles.check}>
                      {cellOfPlayer === 1 ? "X" : cellOfPlayer === 2 ? "O" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  },
  check: {
    fontSize: 40,
  },
  txtHightLight: {
    color: "red",
    fontWeight: "bold",
  },
});
