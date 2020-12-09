import axios from 'axios'

const axiosConfig = {
    baseUrl: 'https://api.github.com/',
    auth: {
        username: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        password: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET
    }
};

function searchRepos(searchText, language) {
    // if no language is requested, just search with `searchText`
    const query = language ? `${searchText}+language:${language}` : searchText;

    // query usually amounts to tetris+language:assembly
    return axios.get(
        `search/repositories?q=${query}&sort=stars&order=desc`,
        axiosConfig
    );
}

export { searchRepos };