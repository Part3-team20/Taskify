import { useCallback, useState } from 'react';

function useFetchWithToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWithToken = useCallback(async (url: string | URL | Request, method = 'GET', body = null) => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      });

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setError(error);
      setLoading(false);
      throw err;
    }
  }, []);

  return { fetchWithToken, loading, error };
}

export default useFetchWithToken;
