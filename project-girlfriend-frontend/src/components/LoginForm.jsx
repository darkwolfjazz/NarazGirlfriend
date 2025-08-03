import React, { useRef, useState } from "react";
import axios from "axios";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

// THEME IMPORTS should be at the app entry point (not in this file!)
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/login', { username, password });
      toast.current.show({ severity: 'success', summary: 'Login successful', detail: res.data, life: 3000 });
    } catch (err) {
      const errorMsg = err?.response?.data
        ? typeof err.response.data === "string"
          ? err.response.data
          : JSON.stringify(err.response.data)
        : 'Server error';
      toast.current.show({ severity: 'error', summary: 'Login failed 💔', detail: errorMsg, life: 3000 });
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: '#ffe4e6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed', // Make sure it doesn't scroll!
        top: 0,
        left: 0
      }}
    >
      <Toast ref={toast} position="top-center" />
      <Card
        style={{
          width: '100%',
          maxWidth: '420px',
          minHeight: '480px', // Increased card height
          padding: '48px 34px 40px',
          borderRadius: '22px',
          boxShadow: '0 8px 36px rgba(120,80,180,0.15)',
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '2.1rem',
            margin: 0,
            marginBottom: 44 // more space after Login title
          }}
        >
          Login
        </h2>

        <div style={{ marginBottom: 38 }}>
          <label
            htmlFor="username"
            style={{
              display: 'block',
              color: '#494949',
              fontWeight: 600,
              fontSize: '1.06rem',
              marginBottom: 10
            }}
          >
            Username
          </label>
          <InputText
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Type your username"
            style={{
              width: '100%',
              background: '#f7f7fb',
              border: '1px solid #e2e2ec',
              borderRadius: '7px',
              padding: '13px 12px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <div style={{ marginBottom: 44 }}>
          <label
            htmlFor="password"
            style={{
              display: 'block',
              color: '#494949',
              fontWeight: 600,
              fontSize: '1.06rem',
              marginBottom: 10
            }}
          >
            Password
          </label>
          <Password
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            feedback={false}
            placeholder="Type your password"
            style={{
              width: '100%',
              background: '#f7f7fb',
              border: '1px solid #e2e2ec',
              borderRadius: '10px',
              padding: '13px 12px',
              fontSize: '1rem',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <Button
          label="LOGIN"
          style={{
            width: '100%',
            padding: '15px 0',
            fontWeight: 700,
            fontSize: '1.08rem',
            background: 'linear-gradient(90deg,#3ca6ff 0%,#b76cf7 100%)',
            border: 'none',
            borderRadius: '7px',
            color: '#fff',
            letterSpacing: 1
          }}
          onClick={handleLogin}
        />
      </Card>
    </div>
  );
};

export default LoginForm;
