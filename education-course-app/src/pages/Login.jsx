import React, { useState } from 'react';
import { loginAPI } from '../services/api/authApi';

const Login = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const data = await loginAPI(email, password);
      localStorage.setItem('token', data.token);
      setView('beranda');
    } catch (err) {
      if (!err.response) {
        setError('Koneksi ke server gagal. Pastikan backend Node.js aktif.');
      } else {
        setError(err.response.data.message || 'Login gagal.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#fffaf0' }}>
      <div className="card p-4 shadow-sm border-0 bg-white rounded-3" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Masuk ke Akun</h3>
          <p className="text-muted small">Yuk, lanjutin belajarmu di videobelajar.</p>
        </div>
        
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label small fw-medium">E-Mail <span className="text-danger">*</span></label>
            <input 
              type="email" 
              className="form-control" 
              style={{ height: '45px' }} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="mb-2">
            <label className="form-label small fw-medium">Kata Sandi <span className="text-danger">*</span></label>
            <input 
              type="password" 
              className="form-control" 
              style={{ height: '45px' }} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <div className="text-end mb-4">
            <a href="#" className="text-decoration-none small text-muted">Lupa Password?</a>
          </div>
          
          <button type="submit" className="btn btn-success w-100 mb-2 fw-medium" style={{ height: '45px', backgroundColor: '#3ecf4c', border: 'none' }} disabled={loading}>
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
          <button type="button" className="btn btn-light w-100 mb-3 fw-medium text-success" style={{ height: '45px', backgroundColor: '#e8f9ec', border: 'none' }} onClick={() => setView('register')}>Daftar</button>
          
          <div className="text-center text-muted small mb-3">atau</div>
          
          <button type="button" className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center bg-white" style={{ height: '45px' }}>
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" width="18" className="me-2" alt="Google" />
            Masuk dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;