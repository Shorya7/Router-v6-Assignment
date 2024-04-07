import { useState, useEffect } from 'react';

export interface Student {
  id: number;
  name: string;
}

interface FetchResult<T> {
  data: T[] | null;
  loading: boolean;
  error: string | null;
}

export const useFetchStudents = (): FetchResult<Student> => {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/students.json');
        if (!response.ok) {
          throw new Error('Failed to fetch students data');
        }
        const jsonData = await response.json();
        setStudents(jsonData.enrolledList);
        // console.log(jsonData.enrolledList[0].name)
        setLoading(false);
      } catch (error:any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();

    return () => {
      
    };
  }, []);

  return { data: students, loading, error };
};
