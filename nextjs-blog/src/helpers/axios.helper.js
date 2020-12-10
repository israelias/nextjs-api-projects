import axios from 'axios'

// cancels the previous request when typing

const cancelConfig = {
    request: null,
    cancelToken: null
}

async function axiosGetCancellable(url, config) {
    // if the request is in progress, cancel the new ones
    if (cancelConfig.request) {
        cancelConfig.request.cancel('canceled');
    }

    // otherwise, get the reference for the request and save it to the config
    cancelConfig.request = axios.CancelToken.source();

    // then save the cancel token
    cancelConfig.cancelToken = cancelConfig.request.token;

    // then copy the values from config and merge to this cancelConfig
    Object.assign(cancelConfig, config);

    // This will always throw an uncaught error on the browser, but we expect this
    // So let the return call run and only catch errors that are not 'canceled'

    try {
        const res = await axios.get(url, cancelConfig);
        return res;
    } catch (error) {
        if (error.message !== 'canceled') {
            throw error;
        }
    }

}

export { axiosGetCancellable };