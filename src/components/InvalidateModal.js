// src/components/InvalidateModal.js
import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

// Style for the modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const InvalidateModal = ({ open, handleClose, handleSubmit }) => {
    const [reason, setReason] = useState('');

    const onSubmit = () => {
        if (reason.trim()) {
            handleSubmit(reason);
            setReason(''); // Clear reason after submit
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="invalidate-question-modal"
        >
            <Box sx={style}>
                <Typography id="invalidate-question-modal" variant="h6" component="h2">
                    Invalidate Question
                </Typography>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    label="Reason for invalidation"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                />
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={onSubmit} sx={{ ml: 1 }}>
                        Invalidate
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default InvalidateModal;