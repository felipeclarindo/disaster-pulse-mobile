import { DrawerNavigationProp } from "@react-navigation/drawer";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type DrawerParamList = {
  home: HomeScreenNavigationProp;
  patio: PatioScreenNavigationProp;
  report: ReportScreenNavigationProp;
  account: AccountScreenNavigationProp;
  login: LoginScreenNavigationProp;
};

export type HomeScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "home"
>;

export type AccountScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "account"
>;

export type ReportScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "report"
>;

export type PatioScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "patio"
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
