// src/components/RoleBasedGuard.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const RoleBasedGuard = ({ roles, children }) => {
    const { user } = useAuth();

    if (user && roles.includes(user.role)) {
        return <>{children}</>;
    }

    return null; // Return nothing if the user's role does not match
};

export default RoleBasedGuard;