// src/pages/DashboardPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Button } from '@mui/material';
import api from '../api/axios';
import QuestionCard from '../components/QuestionCard';
import { useAuth } from '../context/AuthContext';
import RoleBasedGuard from '../components/RoleBasedGuard';

const DashboardPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchQuestions = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get('/questions');
            setQuestions(response.data);
        } catch (err) {
            setError('Failed to fetch questions. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuestions();
    }, [fetchQuestions]);

    const handleVote = async (questionId, voteType) => {
        try {
            const response = await api.post(`/votes/${questionId}`, { voteType });
            // Update the score of the specific question in the local state
            setQuestions(prevQuestions =>
                prevQuestions.map(q =>
                    q.id === questionId ? { ...q, score: response.data.newScore } : q
                )
            );
        } catch (err) {
            console.error('Failed to cast vote:', err);
            // Optionally show an error to the user
        }
    };

    const handleInvalidate = async (questionId, reason) => {
        try {
            await api.post(`/votes/${questionId}/invalidate`, { reason });
            // Refetch all questions to get the updated status and reason
            fetchQuestions();
        } catch (err) {
            console.error('Failed to invalidate question:', err);
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Question Dashboard
                </Typography>
                <Box>
                    <RoleBasedGuard roles={['question_writer']}>
                        <Button variant="contained" onClick={() => navigate('/add-question')}>
                            Add Question
                        </Button>
                    </RoleBasedGuard>
                    <Button onClick={logout} sx={{ ml: 2 }}>Logout</Button>
                </Box>
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
                            <QuestionCard
                                key={question.id}
                                question={question}
                                onVote={handleVote}
                                onInvalidate={handleInvalidate}
                            />
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