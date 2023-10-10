import axios from "axios";

const baseURL = "http://localhost:3000/api";

const myApi = axios.create({ baseURL });

export default myApi;
