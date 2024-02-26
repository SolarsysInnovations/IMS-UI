export const BASE_URL = "https://reqres.in";

type ApiUrls = {
    [key: string]: string;
};

const LOGIN_URL_KEY = "login";

export const API_URLS: ApiUrls = {
    [LOGIN_URL_KEY]: `${BASE_URL}/api/register`
};
