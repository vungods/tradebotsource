import requestApi, { requestApiProps } from "./api";
import { error } from "console";

const getAllocationsOfProject = async (
  project?: string,
  startMonth?: string,
  endMonth?: string
) => {
  const request: requestApiProps = {
    endpoint: `allocations`,
    method: "GET",
    params: {
      project,
      startMonth,
      endMonth,
    },
    body: {},
    responseType: undefined,
    isFormData: true,
  };

  const response = await requestApi(request);
  return response;
};

const getLastestPMOfProject = async (project: string) => {
  const request: requestApiProps = {
    endpoint: `user-project/lastest-pm`,
    method: "GET",
    params: {
      project,
    },
    body: {},
    responseType: undefined,
    isFormData: true,
  };

  const response = await requestApi(request);
  return response;
};

const getAllProjects = async () => {
  const request: requestApiProps = {
    endpoint: `projects/status?limit=999999`,
    method: "GET",
    params: {},
    body: {},
    responseType: undefined,
    isFormData: true,
  };

  const response = await requestApi(request);
  return response.data;
};
export { getAllocationsOfProject, getAllProjects, getLastestPMOfProject };
