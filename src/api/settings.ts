let endpoint = `http://localhost:8081`
if (import.meta.env.VUE_APP_ENDPOINT) endpoint = import.meta.env.VUE_APP_ENDPOINT as string

export const apiEndpoint = endpoint
