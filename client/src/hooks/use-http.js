import React, { useState, useCallback } from 'react'


export default function useHttp() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig) => {
        try {
            setIsLoading(true);
            setError(null);


            const response = await fetch(
                requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : "GET",
                headers: { 'Content-Type': 'application/json' },
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            }
            );

            setIsLoading(false);
            
            if (!response.ok) {
                console.log(response, "error");
                return undefined;
            }  else {
                const data = await response.json();
                return data;
            }


        } catch (error) {
            console.log(error);
            return undefined;
        }

        
    }, []);

    return { isLoading, error, sendRequest };
}
