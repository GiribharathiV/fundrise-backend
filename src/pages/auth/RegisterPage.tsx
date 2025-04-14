import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage; 