import React, { useEffect, useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getProfileAPI, updateProfileAPI, uploadFileAPI } from '../services/api/authApi';

const Profile = ({ setView }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullname: '', phone: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    try {
      const data = await getProfileAPI();
      setUser(data);
      setFormData({
        fullname: data.fullname || '',
        phone: data.phone || '',
        avatar: data.avatar || ''
      });
    } catch (err) {
      console.error('Gagal mengambil profil', err);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        setView('login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    if (!token) {
      setView('login');
    } else {
      fetchProfile();
    }
  }, [setView]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setMessage('Mengunggah foto...');
      setError('');
      const response = await uploadFileAPI(file);
      setFormData(prev => ({ ...prev, avatar: response.filePath }));
      setMessage('Foto berhasil diunggah. Jangan lupa Simpan Perubahan.');
    } catch (err) {
      setError('Gagal mengunggah foto.');
      setMessage('');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await updateProfileAPI(formData);
      setMessage('Profil berhasil diperbarui!');
      setIsEditing(false);
      await fetchProfile(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan profil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading profile...</div>;
  if (!user) return null;

  const getAvatarUrl = () => {
    if (formData.avatar) {
      return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${formData.avatar}`;
    } else if (user.avatar) {
      return `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}${user.avatar}`;
    }
    return `https://ui-avatars.com/api/?name=${user.email}&background=ffcc00`;
  };

  return (
    <div style={{ backgroundColor: '#fffaf0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header setView={setView} />
      
      <div className="container flex-grow-1 py-5">
        <div className="mb-3 mx-auto" style={{ maxWidth: '600px' }}>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setView('beranda')}>
            &larr; Kembali ke Beranda
          </button>
        </div>
        <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
          <div className="card-body p-5 text-center">
            
            <div className="position-relative d-inline-block mb-4">
              <img 
                src={getAvatarUrl()} 
                className="rounded-circle shadow object-fit-cover" 
                width="120" 
                height="120"
                alt="Profile Avatar" 
              />
              {isEditing && (
                <button 
                  className="btn btn-sm btn-primary position-absolute bottom-0 end-0 rounded-circle shadow"
                  style={{ width: '35px', height: '35px' }}
                  onClick={() => fileInputRef.current.click()}
                  title="Ganti Foto"
                >
                  <span style={{ fontSize: '18px', lineHeight: '0' }}>+</span>
                </button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="d-none" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </div>
            
            <h3 className="fw-bold mb-1">{user.fullname || user.username}</h3>
            <p className="text-muted mb-4">{user.email}</p>
            
            {message && <div className="alert alert-success small py-2">{message}</div>}
            {error && <div className="alert alert-danger small py-2">{error}</div>}
            
            <div className="bg-light rounded p-4 text-start mb-4 shadow-sm">
              <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h5 className="fw-bold mb-0">Informasi Personal</h5>
                {!isEditing ? (
                  <button className="btn btn-sm btn-outline-primary" onClick={() => setIsEditing(true)}>Edit Profil</button>
                ) : (
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => setIsEditing(false)}>Batal</button>
                )}
              </div>

              {isEditing ? (
                <>
                  <div className="mb-3">
                    <label className="small text-muted fw-bold mb-1">Nama Lengkap</label>
                    <input type="text" className="form-control" name="fullname" value={formData.fullname} onChange={handleInputChange} />
                  </div>
                  <div className="mb-3">
                    <label className="small text-muted fw-bold mb-1">Nomor Ponsel</label>
                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Contoh: 08123456789" />
                  </div>
                  <button className="btn btn-success w-100 mt-2" onClick={handleSave} disabled={saving}>
                    {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    <label className="small text-muted fw-bold">Nama Lengkap</label>
                    <div className="fw-medium">{user.fullname || '-'}</div>
                  </div>
                  <div className="mb-3">
                    <label className="small text-muted fw-bold">Username</label>
                    <div className="fw-medium">{user.username}</div>
                  </div>
                  <div className="mb-3">
                    <label className="small text-muted fw-bold">Nomor Ponsel</label>
                    <div className="fw-medium">{user.phone || '-'}</div>
                  </div>
                </>
              )}
            </div>
            
            <button 
              className="btn btn-outline-danger px-4" 
              onClick={() => {
                localStorage.removeItem('token');
                setView('login');
              }}
            >
              Keluar Akun
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
