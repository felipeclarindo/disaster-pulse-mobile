import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type DrawerParamList = {
  home: HomeScreenNavigationProp;
  alerts: AlertsScreenNavigationProp;
  account: AccountScreenNavigationProp;
  login: LoginScreenNavigationProp;
  alertStatistics: AlertStatisticsNavigationProp;
  alertDetails: AlertDetailsNavigationProp;
};

export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "home"
>;

export type AccountScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "account"
>;

export type AlertsScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "alerts"
>;

export type AlertStatisticsNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "alertStatistics"
>;
export type AlertDetailsNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "alertDetails"
>;

export type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "register"
>;

export type AuthStackParamList = {
  login: LoginScreenNavigationProp;
  register: RegisterScreenNavigationProp;
  drawer: DrawerParamList;
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "login"
>;
