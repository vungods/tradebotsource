import requestApi, { type requestApiProps } from "./api";

const getUsers = async () => {
  const request: requestApiProps = {
    endpoint: "users",
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const getUsersByRole = async (role: string[]) => {
  const request: requestApiProps = {
    endpoint: "users/roles",
    method: "POST",
    params: undefined,
    body: {"roles" : role},
    responseType: undefined,
  };
  console.log("role ",role)
  const response = await requestApi(request);
  return response.data;
};

const createUserWithoutPass = async (userName: string) => {
  const request: requestApiProps = {
    endpoint: "users/create-without-password",
    method: "POST",
    params: undefined,
    body: `{ "name": "${userName}"}`,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

export { getUsers, getUsersByRole, createUserWithoutPass };
