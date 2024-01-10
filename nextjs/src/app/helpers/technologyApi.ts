import requestApi, { type requestApiProps } from "./api";

const getTechnologies = async () => {
    const request: requestApiProps = {
      endpoint: "technologies",
      method: "GET",
      params: undefined,
      body: {},
      responseType: undefined,
    };
    const response = await requestApi(request);
    return response.data;
  };

const createTechnology = async (technologyName: string) => {
  const request: requestApiProps = {
    endpoint: "technologies",
    method: "POST",
    params: undefined,
    body: `{
        "name": "${technologyName}",
        "type": "frame_work"
    }`,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const getTechnologiesTop5 = async (dateFrom: string, dateTo: string) => {
  const request: requestApiProps = {
    endpoint: "technologies/statistic/top",
    method: "GET",
    params: {startDate: dateFrom, endDate: dateTo},
    body: {},
    responseType: "json",
  };
  const response = await requestApi(request);
  return response.data;
};

export { getTechnologies, createTechnology, getTechnologiesTop5 };
