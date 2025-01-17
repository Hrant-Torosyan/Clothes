import axios, { AxiosInstance } from "axios";

const apiUrl: string = import.meta.env.VITE_BASE_URL;
const axiosClient: AxiosInstance = axios.create({
	baseURL: apiUrl,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
});

export default axiosClient;
