import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import Board from "../../Components/Board";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { IPosition } from "../../Types";
import { groupBy } from "../../Utils";
import { styles } from "./Styles";

const ROW = 3;
const COLUMN = 3;
const ROLES = 3;

const Home = () => {
  const [player, setPlayer] = useState(1);
  const [player1Move, setPlayer1Move] = useState<IPosition[]>([]);
  const [player2Move, setPlayer2Move] = useState<IPosition[]>([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const [winner, setWinner] = useState<any>(null);
  const [totalMove, setTotalMove] = useState(0);
  const [moveWinner, setMoveWinner] = useState<IPosition[]>([]);

  const onMove = (position: IPosition, isEmpty: boolean) => {
    if (isEmpty && !winner) {
      const newTotalCheck = totalMove + 1;
      setTotalMove(newTotalCheck);

      if (player === 1) {
        const newPlayer1Check = [...player1Move];
        newPlayer1Check.push(position);
        setPlayer1Move(newPlayer1Check);

        detectWinner(newPlayer1Check, player, newTotalCheck);
      } else {
        const newPlayer2Check = [...player2Move];
        newPlayer2Check.push(position);
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
    totalMoves: number
  ) => {
    //Check Row
    let rowValid: IPosition[] = [];
    let columValid: IPosition[] = [];
    let cross1Valid: IPosition[] = [];
    let cross2Valid: IPosition[] = [];

    //Check row, column
    const xGroup = groupBy("x")(playerCheck);
    const yGroup = groupBy("y")(playerCheck);

    const xGroupKey = Object.keys(xGroup);
    const yGroupKey = Object.keys(yGroup);
    xGroupKey.map((key) => {
      if (xGroup[key].length === 3) {
        rowValid = xGroup[key];
      }
    });

    yGroupKey.map((key) => {
      if (yGroup[key].length === 3) {
        columValid = yGroup[key];
      }
    });

    //CheckCross
    playerCheck.forEach((item, index) => {
      if (item.x === item.y) {
        cross1Valid.push(item);
        //center
        if (item.x === Math.floor(ROW / 2) && item.y === Math.floor(ROW / 2)) {
          cross2Valid.push(item);
        }
      }

      if (
        (item.x === 0 || item.x === ROW - 1) &&
        (item.y === 0 || item.y === COLUMN - 1) &&
        item.x !== item.y &&
        Math.abs(item.x - item.y) === ROW - 1
      ) {
        cross2Valid.push(item);
      }
    });

    if (
      columValid.length === ROLES ||
      rowValid.length === ROLES ||
      cross1Valid.length === ROLES ||
      cross2Valid.length === ROLES
    ) {
      setWinner(currentPlayer);
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }

      let newMoveWinner: IPosition[] = [];
      if (columValid.length === ROLES) {
        newMoveWinner = columValid;
      } else if (rowValid.length === ROLES) {
        newMoveWinner = rowValid;
      } else if (cross1Valid.length === ROLES) {
        newMoveWinner = cross1Valid;
      } else if (cross2Valid.length === ROLES) {
        newMoveWinner = cross2Valid;
      }

      setMoveWinner(newMoveWinner);
    } else if (totalMoves === ROW * COLUMN) {
      setWinner(3);
    }
  };

  const onNewGame = () => {
    setPlayer1Move([]);
    setPlayer2Move([]);
    setPlayer(1);
    setWinner(null);
    setTotalMove(0);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setMoveWinner([]);
  };

  const onContinue = () => {
    setPlayer1Move([]);
    setPlayer2Move([]);
    setPlayer(1);
    setWinner(null);
    setTotalMove(0);
    setMoveWinner([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SafeAreaView>
        <Header
          winner={winner}
          player={player}
          player1Score={player1Score}
          player2Score={player2Score}
        />

        <Button disabled={!winner} text="Continue" onPress={onContinue} />

        <Board
          row={ROW}
          column={COLUMN}
          player1Move={player1Move}
          player2Move={player2Move}
          moveWinner={moveWinner}
          onMove={onMove}
        />

        <Button
          disabled={!winner}
          text="New Game"
          onPress={onNewGame}
          style={styles.btnNewGame}
        />
      </SafeAreaView>
    </View>
  );
};

export default Home;
