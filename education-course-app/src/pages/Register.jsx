import React, { useState } from 'react';
import CountryDropdown from '../components/CountryDropdown';
import { registerAPI } from '../services/api/authApi';

const Register = ({ setView }) => {
  const [formData, setFormData] = useState({
    fullname: '', username: '', email: '', password: '', confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) {
      return setError('Konfirmasi kata sandi tidak cocok.');
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const data = await registerAPI({ 
        fullname: formData.fullname, 
        username: formData.username, 
        email: formData.email, 
        password: formData.password 
      });
      setMessage(data.message);
      setFormData({ fullname: '', username: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      if (!err.response) {
        setError('Koneksi ke server gagal. Pastikan backend Node.js aktif.');
      } else {
        setError(err.response.data.message || 'Registrasi gagal.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5" style={{ backgroundColor: '#fffaf0' }}>
      <div className="card p-4 shadow-sm border-0 bg-white rounded-3 mt-4" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h3 className="fw-bold">Pendaftaran Akun</h3>
          <p className="text-muted small">Yuk, daftarkan akunmu sekarang juga!</p>
        </div>
        
        {error && <div className="alert alert-danger py-2 small">{error}</div>}
        {message && <div className="alert alert-success py-2 small fw-bold">{message}</div>}

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label small fw-medium">Nama Lengkap <span className="text-danger">*</span></label>
            <input type="text" name="fullname" value={formData.fullname} onChange={handleInputChange} className="form-control" style={{ height: '45px' }} required />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-medium">Username <span className="text-danger">*</span></label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="form-control" style={{ height: '45px' }} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-medium">E-Mail <span className="text-danger">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" style={{ height: '45px' }} required />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-medium">Kata Sandi <span className="text-danger">*</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-control" style={{ height: '45px' }} required />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-medium">Konfirmasi Kata Sandi <span className="text-danger">*</span></label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="form-control" style={{ height: '45px' }} required />
          </div>
          
          <button type="submit" className="btn btn-success w-100 mb-2 fw-medium" style={{ height: '45px', backgroundColor: '#3ecf4c', border: 'none' }} disabled={loading}>
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
          <button type="button" className="btn btn-light w-100 mb-3 fw-medium text-success" style={{ height: '45px', backgroundColor: '#e8f9ec', border: 'none' }} onClick={() => setView('login')}>Masuk</button>
          
          <div className="text-center text-muted small mb-3">atau</div>
          
          <button type="button" className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center bg-white" style={{ height: '45px' }}>
            <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" width="18" className="me-2" alt="Google" />
            Daftar dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;