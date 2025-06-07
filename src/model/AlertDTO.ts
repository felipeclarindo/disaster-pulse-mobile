import { Criticality } from "./Criticality";

export interface AlertDTO {
  description: string;
  topic: string;
  countryId: number;
  criticality: Criticality;
}
