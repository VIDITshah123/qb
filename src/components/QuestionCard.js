// src/components/QuestionCard.js
import React from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

const QuestionCard = ({ question }) => {
    return (
        <Card sx={{ mb: 2, boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                        Author: {question.authorName}
                    </Typography>
                    <Chip label={`Score: ${question.score}`} color="primary" size="small" />
                </Box>

                <Typography variant="h6" component="div" gutterBottom>
                    {question.content}
                </Typography>

                <Box component="ul" sx={{ pl: 2, listStyleType: 'none' }}>
                    {question.options.map((option, index) => (
                        <Typography
                            component="li"
                            key={index}
                            sx={{
                                color: option.isCorrect ? 'green' : 'text.primary',
                                fontWeight: option.isCorrect ? 'bold' : 'normal',
                            }}
                        >
                            {String.fromCharCode(65 + index)}. {option.text}
                        </Typography>
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuestionCard;