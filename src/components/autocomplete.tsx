import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useFetchStudents } from './fetchStudents';
import { useFetchTags } from './fetchTags';

interface TagsProps {
    onSelectedCourseTagsChange: (selectedTags: string[]) => void;
    onSelectedStudentTagsChange: (selectedTags: string[]) => void;
}

const Tags: React.FC<TagsProps> = ({ onSelectedCourseTagsChange, onSelectedStudentTagsChange }) => {
    const { data: studentsData, loading: studentsLoading, error: studentsError } = useFetchStudents();
    const { data: tagsData, loading: tagsLoading, error: tagsError } = useFetchTags();

    if (studentsLoading || tagsLoading) {
        return <div>Loading data...</div>;
    }

    if (studentsError || tagsError) {
        return <div>Error fetching data: {studentsError || tagsError}</div>;
    }

    return (
        <Stack spacing={3} sx={{ width: 500 }}>
            <Autocomplete
            sx={{ "& > :not(style)": { m: 2, width: "70ch" } }}
                multiple
                id="tags-outlined"
                options={tagsData || []}
                filterSelectedOptions
                onChange={(_, value) => onSelectedCourseTagsChange(value.map(v => v.name))}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Course Tags"
                        placeholder="Select Course Tags"
                    />
                )}
            />

            <Autocomplete
            sx={{ "& > :not(style)": { m: 2, width: "70ch" } }}
                multiple
                id="students-outlined"
                options={studentsData || []}
                getOptionLabel={(student) => student.name}
                filterSelectedOptions
                onChange={(_, value) => onSelectedStudentTagsChange(value.map(student => student.name))}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Enrolled Students"
                        placeholder="Select Course Students"
                    />
                )}
            />
        </Stack>
    );
}

export default Tags;
