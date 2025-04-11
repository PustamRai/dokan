import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../../context/authContext'

function ProtectedRoute({ allowedRoles, children }) {
    const { user } = useAuthContext()

    if (!user) {
        // not logged in
        return <Navigate to="/admin/login" replace />
    }

    if (!allowedRoles.includes(user.role)) {
        // logged in but not authorized
        return <Navigate to="/unauthorized" replace />
    }

    // user is allowed
    return children
}

export default ProtectedRoute
