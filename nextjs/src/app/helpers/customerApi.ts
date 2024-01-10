import requestApi, { type requestApiProps } from "./api";

const getCustomers = async () => {
  const request: requestApiProps = {
    endpoint: "customers",
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const createCustomer = async (customerName: string) => {
  const request: requestApiProps = {
    endpoint: "customers",
    method: "POST",
    params: undefined,
    body: `{
      "data": [
        {"name": "${customerName}"}
      ]}`,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

export { getCustomers, createCustomer };
