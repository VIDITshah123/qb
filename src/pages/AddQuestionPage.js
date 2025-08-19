// src/pages/AddQuestionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    IconButton,
    Checkbox,
    FormControlLabel,
    FormHelperText
} from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const AddQuestionPage = () => {
    const navigate = useNavigate();

    const initialValues = {
        content: '',
        options: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
        ],
    };

    const validationSchema = Yup.object().shape({
        content: Yup.string().required('Question content is required'),
        options: Yup.array()
            .of(
                Yup.object().shape({
                    text: Yup.string().required('Option text is required'),
                    isCorrect: Yup.boolean(),
                })
            )
            .min(2, 'At least two options are required')
            .max(6, 'You can have a maximum of six options')
            .test('at-least-one-correct', 'At least one option must be marked as correct', (options) =>
                options.some((option) => option.isCorrect)
            ),
    });

    const handleSubmit = async (values, { setSubmitting, setStatus }) => {
        try {
            await api.post('/questions', values);
            navigate('/dashboard');
        } catch (error) {
            setStatus({ error: 'Failed to add question. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add a New Question
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, isSubmitting, status }) => (
                        <Form>
                            <Field
                                as={TextField}
                                name="content"
                                label="Question Content"
                                fullWidth
                                margin="normal"
                                error={touched.content && Boolean(errors.content)}
                                helperText={touched.content && errors.content}
                            />

                            <Typography sx={{ mt: 2 }}>Options</Typography>
                            <FieldArray name="options">
                                {({ push, remove }) => (
                                    <div>
                                        {values.options.map((option, index) => (
                                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Field
                                                    as={TextField}
                                                    name={`options[${index}].text`}
                                                    label={`Option ${index + 1}`}
                                                    fullWidth
                                                    sx={{ mr: 1 }}
                                                />
                                                <Field
                                                    as={FormControlLabel}
                                                    type="checkbox"
                                                    name={`options[${index}].isCorrect`}
                                                    control={<Checkbox checked={option.isCorrect} />}
                                                    label="Correct"
                                                />
                                                <IconButton onClick={() => remove(index)} disabled={values.options.length <= 2}>
                                                    <RemoveCircleOutline />
                                                </IconButton>
                                            </Box>
                                        ))}
                                        <Button
                                            startIcon={<AddCircleOutline />}
                                            onClick={() => push({ text: '', isCorrect: false })}
                                            disabled={values.options.length >= 6}
                                        >
                                            Add Option
                                        </Button>
                                    </div>
                                )}
                            </FieldArray>
                            {typeof errors.options === 'string' && <FormHelperText error>{errors.options}</FormHelperText>}
                            
                            {status && status.error && <Typography color="error" sx={{ mt: 2 }}>{status.error}</Typography>}

                            <Box sx={{ mt: 3 }}>
                                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit Question'}
                                </Button>
                                <Button onClick={() => navigate('/dashboard')} sx={{ ml: 2 }}>
                                    Cancel
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Container>
    );
};

export default AddQuestionPage;