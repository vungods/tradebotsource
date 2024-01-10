import { BillType } from "./bill";
import { User } from "./user";

export interface AllocationType {
  id: string;
  updateToken: string;
  startDate: string;
  endDate: string;
  rate: number;
  effort: number;
  calendar: number;
  overtime: number;
  sumNetworkDay: number;
  user: User;
  bill: BillType;
}
