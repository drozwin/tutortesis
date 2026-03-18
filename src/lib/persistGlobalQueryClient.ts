import { QueryClient } from "@tanstack/react-query"
import { persistQueryClient } from "@tanstack/react-query-persist-client"
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import { get, set, del } from "idb-keyval"

export const queryClient = new QueryClient()

if (typeof window !== "undefined") {
  const persister = createAsyncStoragePersister({
    storage: {
      getItem: (key) => get(key),
      setItem: (key, value) => set(key, value),
      removeItem: (key) => del(key),
    },
  })

  persistQueryClient({
    queryClient,
    persister,
    maxAge: 1000 * 60 * 60 * 24,
  })
}