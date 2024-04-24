import { useState } from 'react';

function useFetchWithToken() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchWithToken = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body: any = null) => {
    try {
      setLoading(true);
      setError(null);

      const accessToken = localStorage.getItem('accessToken'); // 토큰 가져오기
      const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // 헤더에 토큰 추가
      });

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null, // 객체가 있다면 JSON 문자열로 변환
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      setLoading(false);
      return responseData;
    } catch (err) {
      setError(err as Error);
      setLoading(false);
      throw err; // 에러를 호출자에게 전파합니다.
    }
  };

  return { fetchWithToken, loading, error };
}

export default useFetchWithToken;
