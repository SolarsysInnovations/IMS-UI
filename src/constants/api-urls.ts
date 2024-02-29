export const BASE_URL = "https://reqres.in";
export const BASE_LOCAL_URL = "http://localhost:4000"
type ApiUrls = {
    [key: string]: string;
};

const LOGIN_URL_KEY = "login";
const ALL_CLIENT = "clients";

export const API_URLS: ApiUrls = {
    [LOGIN_URL_KEY]: `${BASE_LOCAL_URL}/user/login`,
    [ALL_CLIENT]: `${BASE_LOCAL_URL}/client/clientList`
};
