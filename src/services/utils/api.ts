// apiUtils.ts

export const makeRequest = async (url: string, method: string, data?: any, id?: any) => {
    try {
        const token = localStorage.getItem('token');
        let requestUrl = url;

        if (id) {
            requestUrl += `/${id}`;
        }
        const config: RequestInit = {
            method: method,
            headers: {
                'Authorization': `Bearer ${token} `,
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        const response = await fetch(requestUrl, config);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}. HTTP status: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(`Network error: ${(error as Error).message}`);
    }
};
