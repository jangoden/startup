import axios from "axios";
import { siteConfig } from "./config";

const apiClient = axios.create({
  baseURL: siteConfig.apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default apiClient;