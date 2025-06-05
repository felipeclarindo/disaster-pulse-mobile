import { View } from "react-native";

const Separator = () => {
  return <View style={styles.separator} />;
};

const styles = {
  separator: {
    height: 1,
    width: "100%" as const,
    backgroundColor: "#2A2A2A",
    marginVertical: 10,
  },
};

export default Separator;
