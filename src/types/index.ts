import { ImageSourcePropType } from "react-native";

export type UserProps = {
  user: string;
  email: string;
  senha?: string;
};
export type Moto = {
  id: string;
  setorDescription: string;
  setorName: string;
  setorColorRgb: string;
  setorId: string;
  plate?: string;
};

export type ImageModalProps = {
  visible: boolean;
  onClose: () => void;
  imageSource: ImageSourcePropType;
};

export type DashboardCardProps = {
  stats: {
    [key: string]: number;
  };
};

export type HeaderComponentProps = {
  title: string;
  navigation: any;
};
