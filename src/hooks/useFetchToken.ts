import { useCallback, useState } from 'react';

function useFetchWithToken() {
  const [loading, setLoading] = useState(false);

  const fetchWithToken = useCallback(async (url: string | URL | Request, method: string = 'GET', body: any = null) => {
    setLoading(true);

    const accessToken = localStorage.getItem('accessToken');

    const headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });

    const config: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, config);
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message;
      throw new Error(errorMessage);
    }

    setLoading(false);

    return responseData;
  }, []);

  return { fetchWithToken, loading };
}

export default useFetchWithToken;
