import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage; 