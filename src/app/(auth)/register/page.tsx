'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import heavy components
const RegisterForm = dynamic(() => import('@/components/auth/RegisterForm'), {
  loading: () => <div>Loading form...</div>,
  ssr: false // Disable SSR for form to reduce initial bundle
});

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
      <RegisterForm />
    </div>
  );
}
