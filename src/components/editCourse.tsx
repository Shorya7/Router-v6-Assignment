import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from './fetchCourses';
import useFetchCourses from './fetchCourses';
import { useFetcher } from "react-router-dom";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Tags from './autocomplete';
import './edit.css'

const EditCourse: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const { courses, loading, error } = useFetchCourses();
    const [course, setCourse] = useState<Course | null>(null);
    const [courseTags, setCourseTags] = useState<string[]>([]);
    const [studentTags, setStudentTags] = useState<string[]>([]);
    const fetcher = useFetcher();

    useEffect(() => {
        const foundCourse = courses.find((c) => c.courseId === courseId);
        if (foundCourse) {
            setCourse(foundCourse);
        }
    }, [courses, courseId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>Course not found.</div>;
    }

    const handleCourseTagsChange = (selectedTags: string[]) => {
        setCourseTags(selectedTags);
    };

    const handleStudentTagsChange = (selectedTags: string[]) => {
        setStudentTags(selectedTags);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Form submitted!");

        console.log("Selected course tags:", courseTags);
        console.log("Selected student tags:", studentTags);

        const formData = new FormData(e.currentTarget);
        await fetcher.submit(formData);
        console.log("Course after submission:", course);
    };

    return (
        <div id='edit_course'>
            <h1>Edit Course Details</h1>
            <fetcher.Form method="post" action={`/edit/${courseId}`} onSubmit={handleSubmit}>
                <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 2, width: "70ch" } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Course Name"
                        variant="outlined"
                        type="name"
                        value={course.courseName}
                        onChange={(e) => {
                            setCourse({ ...course, courseName: e.target.value })
                        }}
                    />
                </Box>
                <Box
                    component="form"
                    sx={{ "& > :not(style)": { m: 2, width: "70ch" } }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        required
                        id="outlined-required"
                        label="Instructor"
                        variant="outlined"
                        type="instructor"
                        value={course.instructorName}
                        onChange={(e) => {
                            setCourse({ ...course, instructorName: e.target.value })
                        }}
                    />
                </Box>
                <Tags onSelectedCourseTagsChange={handleCourseTagsChange} onSelectedStudentTagsChange={handleStudentTagsChange} />

                <button id='update' type="submit" name='action' value="update">Save Changes</button>
            </fetcher.Form>
        </div>
    );
};

export default EditCourse;
