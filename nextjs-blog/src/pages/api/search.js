// so we don't call our external API, we instead call this route.
// this functions as an endpoint
// benefit is we hide the authorization header, as this is handled on the "backend" (server), not the client.
// we call this route and this route calls out.

// turns http://localhost:3000/api/search?q=react into the endpoint

import axios from 'axios'
// import {axiosGetCancellable} from "../helpers/axios.helper";


const axiosConfig = {
    baseURL: 'https://api.github.com/',
    auth: {
        username: process.env.GITHUB_CLIENT_ID,
        password: process.env.GITHUB_CLIENT_SECRET
    }
};

export default async (req, res) => {
    // query needs to be read from the internal caller params...
    const { q, sort, order } = req.query;

    const response = await axios.get(
        `search/repositories?q=${q}&sort=${sort}&order=${order}`,
        axiosConfig
    );

    res.json(response.data);
}