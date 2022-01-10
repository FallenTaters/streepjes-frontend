let endpoint = `http://localhost:8081`

let envEndpoint = import.meta.env.VUE_APP_ENDPOINT
if (envEndpoint && typeof envEndpoint == "string")
    endpoint = import.meta.env.VUE_APP_ENDPOINT as string

export const apiEndpoint = endpoint
