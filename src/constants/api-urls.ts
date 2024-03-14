export const BASE_URL = "https://reqres.in";
export const BASE_LOCAL_URL = "http://localhost:4000";
export const BASE_URL_NODE = "https://node-js-invoice.onrender.com"
// "https://good-lime-fox-tux.cyclic.app"
export const BASE_LOCAL_URL_JAVA = "https://ims-backend-9ghn.onrender.com";

type ApiUrls = {
    [key: string]: string;
};

const LOGIN_URL_KEY = "login";
const ALL_CLIENT = "clients";

export const API_URLS: ApiUrls = {
    [LOGIN_URL_KEY]: `${BASE_URL_NODE}/user/login`,
    [ALL_CLIENT]: `${BASE_URL_NODE}/client/clientList`
};
