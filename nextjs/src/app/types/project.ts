import { CustomerType } from "./customer";
import { DivisionType } from "./division";

export interface ProjectType {
  id: string;
  updateToken: string;
  name: string;
  status: boolean;
  division: DivisionType;
  customer: CustomerType;
}
