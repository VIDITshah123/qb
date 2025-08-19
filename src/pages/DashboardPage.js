// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import api from '../api/axios';
import QuestionCard from '../components/QuestionCard';
import { useAuth } from '../context/AuthContext'; // We'll use this for the logout button

const DashboardPage = () => {
    const { logout } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get('/questions');
                setQuestions(response.data);
            } catch (err) {
                setError('Failed to fetch questions. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Question Dashboard
                </Typography>
                <button onClick={logout} style={{padding: '8px 16px', cursor: 'pointer'}}>Logout</button>
            </Box>

            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            )}

            {error && <Alert severity="error">{error}</Alert>}

            {!loading && !error && (
                <div>
                    {questions.length > 0 ? (
                        questions.map((question) => (
                            <QuestionCard key={question.id} question={question} />
                        ))
                    ) : (
                        <Typography>No questions found.</Typography>
                    )}
                </div>
            )}
        </Container>
    );
};

export default DashboardPage;