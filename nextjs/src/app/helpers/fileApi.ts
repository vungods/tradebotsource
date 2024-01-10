import requestApi, { type requestApiProps } from "./api";
import { saveAs } from "file-saver";

const getFilesById = async (id: string) => {
  const request: requestApiProps = {
    endpoint: `files/estimation/${id}`,
    method: "GET",
    params: undefined,
    body: {},
    responseType: undefined,
  };
  const response = await requestApi(request);
  return response.data;
};

const downloadFileById = async (id: string, fileName: string) => {
  const request: requestApiProps = {
    endpoint: `files/${id}`,
    method: "GET",
    params: undefined,
    body: {},
    responseType: "blob",
  };
  const response = await requestApi(request);
  const pdfBlob = new Blob([response.data], { type: "application/xlsx" });
  return saveAs(pdfBlob, fileName);
};
const DownloadEstimationTemplate = async () => {
  const request: requestApiProps = {
    endpoint: "files/download/estimation_template",
    method: "GET",
    params: undefined,
    body: {},
    responseType: "blob",
  };
  const response = await requestApi(request);

  const blob = new Blob([response.data], { type: "application/octet-stream" });
  return saveAs(blob, "estimation_template.xlsx");
};

export { getFilesById, downloadFileById, DownloadEstimationTemplate };
