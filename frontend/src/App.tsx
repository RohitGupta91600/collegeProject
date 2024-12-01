// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import { AuthProvider, useAuth } from './context/AuthContext'; // Import both AuthProvider and useAuth

// // Component that checks authentication and routes accordingly
// const AppRoutes: React.FC = () => {
//   const { token } = useAuth(); // Access the token from the AuthContext

//   return (
//     <Routes>
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/dashboard"
//         element={token ? <Dashboard /> : <Navigate to="/login" replace />}
//       />
//       <Route path="/" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <AppRoutes /> {/* Render the Routes component inside the Router */}
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes: React.FC = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;

