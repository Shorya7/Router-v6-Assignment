import { useState, useEffect } from 'react';

export interface Tag {
  id: number;
  name: string;
}

interface FetchResult<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
}

export const useFetchTags = (): FetchResult<Tag> => {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/tags.json');
        if (!response.ok) {
          throw new Error('Failed to fetch tags data');
        }
        const jsonData = await response.json();
        setTags(jsonData.tags);
        console.log(jsonData.tags)
        setLoading(false);
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTags();

    return () => {
 
    };
  }, []);

  return { data: tags, loading, error };
};
