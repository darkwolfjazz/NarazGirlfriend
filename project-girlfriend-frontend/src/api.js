import axios from "axios";

const prodUrl=axios.create({
    baseURL: import.meta.env.VITE_API_PROD_URL
});

export default prodUrl;