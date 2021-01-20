import { TouchableOpacityProps } from "react-native";

export interface IPosition {
  x: number;
  y: number;
}

export interface IHeaderProps {
  winner: number;
  player: number;
  player1Score: number;
  player2Score: number;
}

export interface IButtonProps extends TouchableOpacityProps {
  text: string;
  onPress?(): void;
  disabled?: boolean;
}

export interface IBoardProps {
  row: number;
  column: number;
  onMove(potion: IPosition, isEmpty: boolean): void;
  player1Move: IPosition[];
  player2Move: IPosition[];
  moveWinner: IPosition[];
}
