import { Alert } from "react-native";

export interface Country {
  id: number;
  name: string;
  alerts: Alert[];
}
