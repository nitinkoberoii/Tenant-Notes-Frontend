import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import LoginHeader from './components/LoginHeader';
import SecurityBadges from './components/SecurityBadges';
import RateLimitIndicator from './components/RateLimitIndicator';
import apiClient from '../../api/axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    // Check if user is already logged in using the correct key 'token'
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = '/notes-management';
    }
  }, []);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Make a real API call to the login endpoint
      const response = await apiClient.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // 2. Extract the token and user data from the successful response
      const { token, user } = response.data;

      // 3. Store the authentication data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(user));

      if (formData.rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }

      // 4. Reset attempts and redirect on successful login
      setLoginAttempts(0);
      window.location.href = '/notes-management';

    } catch (err) {
      // 5. Handle errors from the API
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);

      if (err.response && err.response.data && err.response.data.message) {
        if (newAttempts >= 5) {
          setError("Account temporarily locked. Please try again in 5 minutes.");
        } else {
          setError(`${err.response.data.message} ${5 - newAttempts} attempts remaining.`);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-5xl flex gap-8 items-start">
        {/* Mock Credentials Helper */}
        <div className="w-96 p-4 -ml-4 bg-muted/50 rounded-lg border border-border">
          <div className="text-center mb-3">
            <h3 className="text-sm font-semibold text-foreground">Demo Credentials</h3>
            <p className="text-xs text-muted-foreground">Use these credentials to test the application</p>
          </div>
          
          <div className="space-y-2 text-xs">
            {/* You can keep or remove this section as it's just for display */}
            <div className="flex justify-between items-center p-2 bg-card rounded border">
              <span className="font-medium text-foreground">Admin ACME:</span>
              <span className="text-muted-foreground">admin@acme.test / password</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-card rounded border">
              <span className="font-medium text-foreground">User ACME:</span>
              <span className="text-muted-foreground">user@acme.test / password</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-card rounded border">
              <span className="font-medium text-foreground">Admin Globex:</span>
              <span className="text-muted-foreground">admin@globex.test / password</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-card rounded border">
              <span className="font-medium text-foreground">User Globex:</span>
              <span className="text-muted-foreground">user@globex.test / password</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
            <LoginHeader />
            <RateLimitIndicator 
              attempts={loginAttempts} 
              maxAttempts={5} 
            />
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
            <SecurityBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;