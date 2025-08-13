import axios from "axios";

const prodUrl=axios.create({
    baseURL:process.env.REACT_APP_API_PROD_URL
});

export default prodUrl;