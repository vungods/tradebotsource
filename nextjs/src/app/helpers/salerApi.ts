import requestApi, { type requestApiProps } from "./api";

const getSalers = async () => {
  const request: requestApiProps = {
    endpoint: "salers",
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const createSaler = async (salerName: string) => {
  const request: requestApiProps = {
    endpoint: "salers",
    method: "POST",
    params: undefined,
    body: `{"name": "${salerName}"}`,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

export { getSalers, createSaler };
