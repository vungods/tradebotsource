import { json } from "stream/consumers";
import requestApi, { type requestApiProps } from "./api";

const getFirstMail = async () => {
  const request: requestApiProps = {
    endpoint: 'mail/first',
    method: "GET",
    params: undefined,
    body: {},
    responseType: 'json',
  };
  const response = await requestApi(request);

  return response.data;
};

const createMail = async (formData: FormData) => {
  const request: requestApiProps = {
    endpoint: "mail",
    method: "POST",
    params: undefined,
    body: formData,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response?.data;
};

const updateMail = async (id: string, formData: FormData) => {
  const request: requestApiProps = {
    endpoint: `mail/${id}`,
    method: "PUT",
    params: undefined,
    body: formData,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response;
};

const getMailById = async (id: string) => {
  const request: requestApiProps = {
    endpoint: `mail/${id}`,
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response?.data;
};

const sendMail = async (id: string) => {
  const request: requestApiProps = {
    endpoint: `mail/estimation/${id}`,
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response?.data;
};

export { getFirstMail, createMail, updateMail, getMailById, sendMail };

