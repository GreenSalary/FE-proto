import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import StoreDashboard from './pages/Instore/StoreDashboard';

const App = () => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const savedType = localStorage.getItem('userType');
    if (savedType) {
      setUserType(savedType);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWrapper setUserType={setUserType} />} />
        <Route path="/employer" element={<EmployerDashboard userType={userType} />} />
        <Route path="/employee" element={<EmployeeDashboard userType={userType} />} />
        <Route path="/store" element={<StoreDashboard userType={userType} />} />
      </Routes>
    </Router>
  );
};

const LoginWrapper = ({ setUserType }) => {
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    let type = '';

    if (userType === 'employer') {
      type = 'employer';
      navigate('/employer');
    } else if (userType === 'employee') {
      type = 'employee';
      navigate('/employee');
    } else if (userType === 'store') {
      type = 'store';
      navigate('/store');
    } else {
      alert('지원되지 않는 사용자 유형입니다.');
      return;
    }

    setUserType(type);
    localStorage.setItem('userType', type); 
  };

  return <AuthForm onLogin={handleLogin} />;
};

export default App;
