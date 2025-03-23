import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';
import { UserRole } from './Interfaces/User';
import LoginPage from './Pages/login';
import Employees from './Pages/Employees';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* HR Admin Routes */}
          <Route element={<ProtectedRoute requiredRole={UserRole.HR_ADMIN} />}>
            <Route path="/" element={<Employees />} />
          </Route>

          {/* Ward Admin Routes */}
          <Route element={<ProtectedRoute requiredRole={UserRole.WARD_ADMIN} />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
