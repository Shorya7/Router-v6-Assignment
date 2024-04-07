import React from 'react';
import { Link } from 'react-router-dom';
import useFetchCourses from './fetchCourses';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import dsa from "../assets/Learning-Data-Structures-and-Algorithms-is-Important1.png"
import './courses.css'

const CourseList: React.FC = () => {
  const { courses, loading, error } = useFetchCourses();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div id='course_list'>
      {courses.map(course => (
        <Card key={course.courseId} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={dsa}
            title="green iguana"
          />
          <CardContent>
            <Typography sx={{textAlign:'center', marginBottom:2}} gutterBottom variant="h5" component="div">
              {course.courseName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Course ID: {course.courseId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Instructor: {course.instructorName}
            </Typography>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/edit/${course.courseId}`} size="small">
              Edit
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CourseList;
