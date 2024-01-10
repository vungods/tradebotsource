import { ProjectType } from "./project";

export interface BillType {
  id: string;
  updateToken: string;
  billValue?: number;
  date: string;
  project: ProjectType;
}
