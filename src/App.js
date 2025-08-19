// src/App.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- Page Imports ---
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage'; 
import ProtectedRoute from './components/ProtectedRoute';
import AddQuestionPage from './pages/AddQuestionPage';
// --- Placeholder Pages ---

// const DashboardPage = () => {
//     const { user, logout } = useAuth();
//     return (
//         <div>
//             <h2>Dashboard</h2>
//             {user && (
//                 <>
//                     <p>Welcome, {user.name} ({user.role})!</p>
//                     <button onClick={logout}>Logout</button>
//                 </>
//             )}
//         </div>
//     );
// };

const HomePage = () => (
    <div>
        <h2>Home Page</h2>
        <nav>
            <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
    </div>
);

function App() {
  // const { user } = useAuth();
  // return (
  //     <div>
  //         {/* You can remove the main H1 and HR if you want a cleaner look */}
  //         <Routes>
  //             <Route path="/" element={<HomePage />} />

  //             <Route
  //                 path="/login"
  //                 element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
  //             />

  //             <Route
  //                 path="/dashboard"
  //                 element={
  //                     <ProtectedRoute>
  //                         {/* USE THE REAL DASHBOARD PAGE HERE */}
  //                         <DashboardPage />
  //                     </ProtectedRoute>
  //                 }
  //             />
  //         </Routes>
  //     </div>
  // );
  //Add Question' feature for Question Writersdone at this commit(before)

  const { user } = useAuth();
  return (
      <div>
          <Routes>
              {/* ... (other routes remain the same) ... */}

              <Route
                  path="/dashboard"
                  element={
                      <ProtectedRoute>
                          <DashboardPage />
                      </ProtectedRoute>
                  }
              />

              {/* --- ADD THIS NEW ROUTE --- */}
              <Route
                  path="/add-question"
                  element={
                      <ProtectedRoute>
                          <AddQuestionPage />
                      </ProtectedRoute>
                  }
              />
               {/* --- END NEW ROUTE --- */}
          </Routes>
      </div>
  );
}


export default App;