import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_BASE_URL ?? "http://103.200.38.3:4200/api/v1/",
});

export default API;
