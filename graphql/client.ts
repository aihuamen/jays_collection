import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { useMemo } from "react";

let client: ApolloClient<NormalizedCacheObject> | null

const createClient = () => new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
        uri: "https://graphql.anilist.co"
    }),
    cache: new InMemoryCache()
})

export const initApollo = (initialState: any = null) => {
    const _client = client ?? createClient()

    if(!!initialState) {
        const existingCache = _client.extract()
        _client.cache.restore({...existingCache, ...initialState})
    }
    
    if (typeof window === "undefined") return _client

    client = client ?? _client

    return client
}

export const useApollo = (initialState: any) => {
    const store = useMemo(() => initApollo(initialState), [initialState])
    return store
}

