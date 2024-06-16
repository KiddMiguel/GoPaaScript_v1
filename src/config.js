let storedConfig = {
    url: '',
    bearerToken: '',
    ids: []
};

function setConfig(url, bearerToken, ids) {
    storedConfig.url = url;
    storedConfig.bearerToken = bearerToken;
    storedConfig.ids = ids;
}

function getConfig() {
    return storedConfig;
}

module.exports = {
    setConfig,
    getConfig
};