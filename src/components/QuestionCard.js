// src/components/QuestionCard.js
import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Box, Chip, IconButton } from '@mui/material';
import { ThumbUp, ThumbDown, Report } from '@mui/icons-material';
import RoleBasedGuard from './RoleBasedGuard';
import InvalidateModal from './InvalidateModal';

const QuestionCard = ({ question, onVote, onInvalidate }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleInvalidateSubmit = (reason) => {
        onInvalidate(question.id, reason);
        setModalOpen(false);
    };

    return (
        <>
            <Card sx={{ mb: 2, boxShadow: 3, opacity: question.status === 'invalid' ? 0.5 : 1 }}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            Author: {question.authorName}
                        </Typography>
                        {question.status === 'invalid' ? (
                             <Chip label="Invalid" color="error" size="small" />
                        ) : (
                             <Chip label={`Score: ${question.score}`} color="primary" size="small" />
                        )}
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

                    {question.status === 'invalid' && (
                        <Typography variant="body2" color="error" sx={{mt: 2, fontStyle: 'italic'}}>
                            Reason for invalidation: {question.invalidationReason}
                        </Typography>
                    )}
                </CardContent>
                <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
                    <RoleBasedGuard roles={['question_writer', 'reviewer']}>
                        <IconButton aria-label="upvote" onClick={() => onVote(question.id, 'upvote')}>
                            <ThumbUp />
                        </IconButton>
                        <IconButton aria-label="downvote" onClick={() => onVote(question.id, 'downvote')}>
                            <ThumbDown />
                        </IconButton>
                    </RoleBasedGuard>
                    <RoleBasedGuard roles={['reviewer']}>
                         <IconButton aria-label="invalidate" onClick={() => setModalOpen(true)}>
                            <Report />
                        </IconButton>
                    </RoleBasedGuard>
                </CardActions>
            </Card>

            <InvalidateModal
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleSubmit={handleInvalidateSubmit}
            />
        </>
    );
};

export default QuestionCard;