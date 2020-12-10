import axios from 'axios'
import { axiosGetCancellable } from "../helpers/axios.helper";

const axiosConfig = {
    baseURL: 'https://api.github.com/',
    auth: {
        username: process.env.GITHUB_CLIENT_ID,
        password: process.env.GITHUB_CLIENT_SECRET
    }
};

function searchRepos(searchText, language) {
    // if no language is requested, just search with `searchText`
    const query = language ? `${searchText}+language:${language}` : searchText;

    // if search repos is called from the server side, we call github directly along with our configs
    if(isServer()) {
        return axios.get(
            `search/repositories?q=${query}&sort=stars&order=desc`,
            axiosConfig
        );
    }

    // if search repos is called from client side, use our own api.

    // merges our auth params with the cancel config
    // no axiosconfig, calls to our own directory...
    // all server side, no client side. secrets are fully on server side and are secured
    return axiosGetCancellable(`api/search?q=${query}&sort=stars&order=desc`);
}

// get repo and profile links for list items

function getRepo(id) {
    return axios.get(`repositories/${id}`, axiosConfig);
}

// aka login

function getProfile(username) {
    return axios.get(`users/${username}`, axiosConfig);
}

// evaluates to true if we're running on server
function isServer() {
    return typeof window === 'undefined';
}

export { searchRepos, getRepo, getProfile };