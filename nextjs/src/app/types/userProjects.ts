import { ProjectType } from "./project";
import { User } from "./user";

export interface UserProjectType {
  id: string;
  updateToken: string;
  date: string;
  project?: ProjectType;
  user?: User;
}
