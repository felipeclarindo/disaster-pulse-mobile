import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import HomePage from "../pages/screens/HomePage";
import AccountPage from "../pages/screens/AccountPage";
import CustomDrawerContent from "./CustomDrawerContent";
import AlertsPage from "../pages/screens/AlertsPage";
import AlertDetailsPage from "../pages/screens/AlertDetailsPage";
import AlertStatisticsPage from "../pages/screens/AlertStatisticsPage";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#FC7032",
        drawerInactiveTintColor: "#8D8D8D",
        drawerLabelStyle: {
          fontWeight: "600",
          fontSize: 16,
        },
        drawerActiveBackgroundColor: "#1C1C1C",
        drawerStyle: {
          backgroundColor: "#000000",
        },
      }}
    >
      <Drawer.Screen
        name="home"
        component={HomePage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          title: "Início",
        }}
      />
      <Drawer.Screen
        name="alerts"
        component={AlertsPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
          title: "Alertas",
        }}
      />
      <Drawer.Screen
        name="alertsDetails"
        component={AlertDetailsPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
          title: "Detalhes dos Alertas",
        }}
      />
      <Drawer.Screen
        name="alertsStatistics"
        component={AlertStatisticsPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="bell" size={size} color={color} />
          ),
          title: "Estatisticas dos Alertas",
        }}
      />

      <Drawer.Screen
        name="account"
        component={AccountPage}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          title: "Minha Conta",
        }}
      />
    </Drawer.Navigator>
  );
}
