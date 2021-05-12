export enum LoadState {
    Unknown,
    NotLoaded,
    Loading,
    Success,
    Failed,
}

export interface FetchResult<Type> {
    statusCode: number
    payload: Type
}

export async function doFetch<Type>(
    url: string,
    method = "GET",
    payload?: Record<string, unknown> | undefined
): Promise<Type> {
    return fetch(url, {
        method: method,
        body: payload ? JSON.stringify(payload) : undefined,
        credentials: "include",
    }).then((resp) => resp.json())
}
