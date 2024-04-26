import { useCallback, useState } from 'react';

function useFetchWithToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithToken = useCallback(async (url: string | URL | Request, method = 'GET', body: any = null) => {
    setLoading(true);
    setError(null);
    try {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const contentType = response.headers.get('content-type');
      let data = null;

      if (contentType && contentType.indexOf('application/json') !== -1) {
        data = await response.json();
      }

      setLoading(false);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { fetchWithToken, loading, error };
}

export default useFetchWithToken;
