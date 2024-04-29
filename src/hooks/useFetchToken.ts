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

    // PUT 요청시, 204 상태는 response 값이 없으므로 바로 return
    if (response.status === 204) return null;

    const responseData = await response.json();

    if (!response.ok) {
      if (response.status === 500) {
        throw new Error('서버 에러가 발생했습니다.');
      }

      const errorMessage = responseData.message;
      throw new Error(errorMessage);
    }

    setLoading(false);

    return responseData;
  }, []);

  return { fetchWithToken, loading };
}

export default useFetchWithToken;
