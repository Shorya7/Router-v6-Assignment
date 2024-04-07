import { useState, useEffect } from 'react';

export interface Course {
  courseId: string;
  instructorName: string;
  courseName: string;
  tags: string[];
  students: { name: string }[];
}

const useFetchCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/thedevelopers-co-in/dummy-api/main/course.json');
        if (!response.ok) {
          throw new Error('Failed to fetch course data');
        }
        const data = await response.json();
        setCourses(data.courses);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourses();

    return () => {
    };
  }, []);

  return { courses, loading, error };
};

export default useFetchCourses;
