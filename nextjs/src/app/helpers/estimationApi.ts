import requestApi, { type requestApiProps } from "./api";
import type { OutputFilterOptionType } from "../types/estimation";

const getEstimations = async (page: number, filter: OutputFilterOptionType) => {
  const request: requestApiProps = {
    endpoint: "estimations/search",
    method: "POST",
    params: {
      page,
    },
    body: filter,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const getEstimationsSearch = async (dateFrom: string, dateTo: string) => {
  const request: requestApiProps = {
    endpoint: "estimations/statistic",
    method: "GET",
    params: { startDate: dateFrom, endDate: dateTo },
    body: {},
    responseType: "json",
  };
  const response = await requestApi(request);
  return response.data;
};

const getEstimationsTop10 = async (
  dateFrom: string,
  dateTo: string,
  option: string
) => {
  const request: requestApiProps = {
    endpoint: "estimations/statistic/top",
    method: "GET",
    params: { startDate: dateFrom, endDate: dateTo, status: option },
    body: {},
    responseType: "json",
  };
  const response = await requestApi(request);
  return response.data;
};

const getCustomerTop10WithEstimation = async (
  dateFrom: string,
  dateTo: string
) => {
  const request: requestApiProps = {
    endpoint: "estimations/statistic/customer",
    method: "GET",
    params: { startDate: dateFrom, endDate: dateTo },
    body: {},
    responseType: "json",
  };
  const response = await requestApi(request);
  return response.data;
};

const getEstimationById = async (id: string) => {
  const request: requestApiProps = {
    endpoint: `estimations/${id}`,
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const deleteEstimationByID = async (id: string, updateToken: string) => {
  const request: requestApiProps = {
    endpoint: "estimations",
    method: "DELETE",
    params: undefined,
    body: {
      id,
      updateToken,
    },
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response;
};

const createEstimation = async (formData: FormData) => {
  const request: requestApiProps = {
    endpoint: "estimations/",
    method: "POST",
    params: undefined,
    body: formData,
    responseType: undefined,
    isFormData: true,
  };
  const response = await requestApi(request);
  return response?.data;
};

const updateEstimation = async (id: string, formData: FormData) => {
  const request: requestApiProps = {
    endpoint: `estimations/${id}`,
    method: "PUT",
    params: undefined,
    body: formData,
    responseType: undefined,
    isFormData: true,
  };
  const response = await requestApi(request);
  return response;
};

const validateImportEstimation = async (formData: FormData) => {
  const request: requestApiProps = {
    endpoint: "estimations/import-validate",
    method: "POST",
    params: undefined,
    body: formData,
    responseType: undefined,
    isFormData: true,
  };
  const response = await requestApi(request);
  return response?.data;
};

const ImportEstimation = async (data: any) => {
  const request: requestApiProps = {
    endpoint: "estimations/import",
    method: "POST",
    params: undefined,
    body: data,
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response?.data;
};

export {
  getEstimations,
  getEstimationById,
  createEstimation,
  updateEstimation,
  deleteEstimationByID,
  getEstimationsSearch,
  getEstimationsTop10,
  getCustomerTop10WithEstimation,
  validateImportEstimation,
  ImportEstimation,
};
