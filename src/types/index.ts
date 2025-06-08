export type UserProps = {
  user: string;
  email: string;
  senha?: string;
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
export interface Alert {
  id: number;
  topic: string;
  description: string;
  countryId: number;
  criticality: number;
}
