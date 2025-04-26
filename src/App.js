import React from 'react';
import AuthForm from './components/AuthForm';

function App() {
  const handleLogin = (userData) => {
    console.log('로그인 성공!', userData);
    // 로그인 성공시 처리하는 부분
  };

  return (
    <div>
      <AuthForm onLogin={handleLogin} />
    </div>
  );
}

export default App;

