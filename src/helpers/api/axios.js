import axios from "axios";
import { Domain } from "../../utility/Domain";


const axiosInstace = axios.create({
  baseURL: `${Domain}`,
});

axiosInstace.interceptors.request.use(
  (config) => {
    if (config?.headers)
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => { }
);

export default axiosInstace;
