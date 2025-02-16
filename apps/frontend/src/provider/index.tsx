'use client'

import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                gcTime: 1000 * 60 * 60 * 24, // 24 hours
            },
        },
    })
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </Provider>
    )
}

export default AppProvider