import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api/auth",
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log("token interceptors", token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
         console.log("response response", response);
        return response;
    },
    (error) => {
        try {
            const { response } = error;
            // console.log("response error", response);
            if (response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (err) {
            console.error(err);
        }
        throw error;
    }
);

export default axiosClient;
