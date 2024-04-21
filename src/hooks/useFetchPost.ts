import { useState } from 'react';

function useFetchPost() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchPost = async (url: string, data: any) => {
    try {
      setLoading(true);

      const response = await fetch(`https://sp-taskify-api.vercel.app/4-20${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 여기에 필요한 다른 헤더들을 추가할 수 있습니다.
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      setLoading(false);

      return responseData;
    } catch (err: any) {
      setError(err);
      setLoading(false);
      throw error; // 에러를 보여줍니다.
    }
  };

  return { fetchPost, loading, error };
}

export default useFetchPost;
