// src/App.js
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// --- Page Imports ---
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddQuestionPage from './pages/AddQuestionPage';
import ProtectedRoute from './components/ProtectedRoute';

// A simple component for the homepage
const HomePage = () => (
    <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Welcome to the Question Bank Management System</h2>
        <nav>
            <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
        </nav>
    </div>
);

function App() {
    const { user } = useAuth();

    return (
        <div>
            <Routes>
                {/* --- Public Routes --- */}
                <Route path="/" element={<HomePage />} />
                
                {/* If a user is already logged in, trying to access /login will redirect them to the dashboard */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
                />

                {/* --- Protected Routes --- */}
                {/* The <ProtectedRoute> wrapper ensures only logged-in users can access these pages. */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-question"
                    element={
                        <ProtectedRoute>
                            <AddQuestionPage />
                        </ProtectedRoute>
                    }
                />

                {/* --- Fallback Route --- */}
                {/* If no other route matches, redirect to the homepage */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;


// // src/App.js
// import React from 'react';
// import { Routes, Route, Link, Navigate } from 'react-router-dom';
// import { useAuth } from './context/AuthContext';

// // --- Page Imports ---
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage'; 
// import ProtectedRoute from './components/ProtectedRoute';
// import AddQuestionPage from './pages/AddQuestionPage';
// // --- Placeholder Pages ---

// // const DashboardPage = () => {
// //     const { user, logout } = useAuth();
// //     return (
// //         <div>
// //             <h2>Dashboard</h2>
// //             {user && (
// //                 <>
// //                     <p>Welcome, {user.name} ({user.role})!</p>
// //                     <button onClick={logout}>Logout</button>
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// const HomePage = () => (
//     <div>
//         <h2>Home Page</h2>
//         <nav>
//             <Link to="/login">Login</Link> | <Link to="/dashboard">Dashboard</Link>
//         </nav>
//     </div>
// );

// function App() {
//   // const { user } = useAuth();
//   // return (
//   //     <div>
//   //         {/* You can remove the main H1 and HR if you want a cleaner look */}
//   //         <Routes>
//   //             <Route path="/" element={<HomePage />} />

//   //             <Route
//   //                 path="/login"
//   //                 element={user ? <Navigate to="/dashboard" /> : <LoginPage />}
//   //             />

//   //             <Route
//   //                 path="/dashboard"
//   //                 element={
//   //                     <ProtectedRoute>
//   //                         {/* USE THE REAL DASHBOARD PAGE HERE */}
//   //                         <DashboardPage />
//   //                     </ProtectedRoute>
//   //                 }
//   //             />
//   //         </Routes>
//   //     </div>
//   // );
//   //Add Question' feature for Question Writersdone at this commit(before)

//   const { user } = useAuth();
//   return (
//       <div>
//           <Routes>
//               {/* ... (other routes remain the same) ... */}

//               <Route
//                   path="/dashboard"
//                   element={
//                       <ProtectedRoute>
//                           <DashboardPage />
//                       </ProtectedRoute>
//                   }
//               />

//               {/* --- ADD THIS NEW ROUTE --- */}
//               <Route
//                   path="/add-question"
//                   element={
//                       <ProtectedRoute>
//                           <AddQuestionPage />
//                       </ProtectedRoute>
//                   }
//               />
//                {/* --- END NEW ROUTE --- */}
//           </Routes>
//       </div>
//   );
// }


// export default App;