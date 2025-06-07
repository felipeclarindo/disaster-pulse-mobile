import { Country } from "./Country";
import { Criticality } from "./Criticality";

export interface Alert {
  id: number;
  topic: string;
  description: string;
  countryId: number;
  criticality: Criticality;
  country?: Country;
}
