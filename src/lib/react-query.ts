import { QueryClient } from '@tanstack/react-query';

export const getQueryClient = (() => {
    let queryClient: QueryClient | null = null;

    return () => {
        if (!queryClient) {
            queryClient = new QueryClient();
        }
        return queryClient;
    };
})();