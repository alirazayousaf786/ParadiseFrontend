import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [adminName, setAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔹 Handle Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/adminlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: adminName, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('✅ Login Successful', {
          position: 'top-right',
          autoClose: 2000,
        });
        localStorage.setItem('adminToken', data.token);

        // Delay navigation slightly to show toast
        setTimeout(() => navigate('/admin/dashboard'), 1500);
      } else {
        toast.error(`❌ ${data.message || 'Invalid credentials'}`, {
          position: 'top-right',
          autoClose: 2500,
        });
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.warning('⚠️ Server not responding', {
        position: 'top-right',
        autoClose: 2500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="flex justify-center items-center min-h-screen">
        <form className="form login-form" onSubmit={handleSubmit}>
          <p className="title">Admin Login</p>
          <p className="message">Enter your credentials to access the panel</p>

          <label>
            <input
              required
              type="text"
              placeholder=" "
              className="input"
              value={adminName}
              onChange={(e) => setAdminName(e.target.value)}
            />
            <span>Admin Name</span>
          </label>

          <label>
            <input
              required
              type="password"
              placeholder=" "
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </label>

          <button className="submit" type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: whitesmoke;
    color: #212121;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #3cb371;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #3cb371;
  }

  .title::after {
    animation: pulse 1s linear infinite;
  }

  .message {
    font-size: 14.5px;
    color: #333;
    text-align: center;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #dcfce7;
    color: black;
    width: 100%;
    padding: 20px 5px 5px 10px;
    outline: 0;
    border: 1px solid #dcfce7;
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(24, 23, 23, 0.89);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: green;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: black;
    font-size: 16px;
    background-color: #dcfce7;
    border: 1px solid #040404ff;
    transition: 0.3s ease;
  }

  .submit:hover {
    background-color: rgba(82, 205, 84, 0.936);
    color: whitesmoke;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }
    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default AdminLogin;
