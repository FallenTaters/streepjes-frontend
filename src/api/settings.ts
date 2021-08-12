let endpoint = `http://localhost:8081`
if (process.env.VUE_APP_ENDPOINT) endpoint = process.env.VUE_APP_ENDPOINT

export const apiEndpoint = endpoint
