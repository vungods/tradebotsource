import { CustomerType } from "./customer";
import { FileType } from "./file";
import { CustomerOption, StatusOption } from "./options";
import { SalerType } from "./saler";
import { Technology } from "./technology";
import { User } from "./user";

interface FilterOptionType {
  customer: CustomerOption | any;
  status: StatusOption | any;
  startDate: string;
  endDate: string;
  estimationName: string;
  technologyIds: any[] | [];
}

interface OutputFilterOptionType {
  customerId?: string;
  status: StatusOption | any;
  startDate: string;
  endDate: string;
  estimationName: string;
  technologyIds: any[] | [];
}

interface EstimationType {
  id: string;
  name: string;
  customer: CustomerType;
  startDate: string;
  createdDate: string;
  status: string;
  winRate: number;
  manMonth: number;
  description: string;
  saler: SalerType;
  updateToken: string;
  technologies: Technology[] | [];
  user: User;
  file: FileType;
}

interface TotalEstimationStatusType {
  status: string;
  quantity: number;
  manMonth: number;
}

export type {
  FilterOptionType,
  EstimationType,
  OutputFilterOptionType,
  TotalEstimationStatusType,
};
