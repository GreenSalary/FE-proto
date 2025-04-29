import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthForm from './components/auth/AuthForm';

// Employer
import EmployerDashboard from './pages/Employer/EmployerDashboard';
import EmployerList from './pages/Employer/EmployerList';
import EmployerHome from './pages/Employer/EmployerHome';
import EmployerClock from './pages/Employer/EmployerClock';
import EmployerMembers from './pages/Employer/EmployerMembers';
import EmployerPlus from './pages/Employer/EmployerPlus';
import EmployerAddMembers from './pages/Employer/EmployerAddMembers';
import EmployerAddStore from './pages/Employer/EmployerAddStore';
import EmployerMypage from './pages/Employer/EmployerMypage';

// Employee
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import EmployeeHome from './pages/Employee/EmployeeHome';
import EmployeeClock from './pages/Employee/EmployeeClock';
import EmployeeList from './pages/Employee/EmployeeList';
import EmployeeMyPage from './pages/Employee/EmployeeMyPage';
import EmployeeAddStore from './pages/Employee/EmployeeAddStore';

// Instore
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

        {/* Employer */}
        <Route path="/employer" element={<EmployerDashboard userType={userType} />}>
          <Route index element={<Navigate to="list" replace />} /> 
          <Route path="list" element={<EmployerList />} />
          <Route path="addstore" element={<EmployerAddStore />} /> {/* 🔥 추가 */}
          <Route path=":storeId">
            <Route path="home" element={<EmployerHome />} />
            <Route path="clock" element={<EmployerClock />} />
            <Route path="members" element={<EmployerMembers />} />
            <Route path="plus" element={<EmployerPlus />} />
            <Route path="addmember" element={<EmployerAddMembers />} />
            <Route path="mypage" element={<EmployerMypage />} />
          </Route>
        </Route>


        {/* Employee */}
        <Route path="/employee" element={<EmployeeDashboard userType={userType} />}>
          <Route index element={<Navigate to="list" replace />} /> 
          <Route path="list" element={<EmployeeList />} />
          <Route path="addstore" element={<EmployeeAddStore />} /> {/* 🔥 추가 */}
          <Route path=":storeId">
            <Route path="home" element={<EmployeeHome />} />
            <Route path="clock" element={<EmployeeClock />} />
            <Route path="mypage" element={<EmployeeMyPage />} />
          </Route>
        </Route>

        {/* Store  */}
        <Route path="/store" element={<StoreDashboard userType={userType} />} />

        {/* 없는 경로는 메인으로 리다이렉트 */}
        <Route path="*" element={<Navigate to="/" replace />} />
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
