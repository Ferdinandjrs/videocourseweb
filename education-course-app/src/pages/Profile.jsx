import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = ({ setView }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
        setView('login');
      }
    } else {
      setView('login');
    }
  }, [setView]);

  if (!user) return <div className="text-center mt-5">Loading profile...</div>;

  return (
    <div style={{ backgroundColor: '#fffaf0', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header setView={setView} />
      
      <div className="container flex-grow-1 py-5">
        <div className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '600px', borderRadius: '15px' }}>
          <div className="card-body p-5 text-center">
            <img 
              src={`https://ui-avatars.com/api/?name=${user.email}&background=ffcc00`} 
              className="rounded-circle mb-4 shadow" 
              width="100" 
              alt="Profile Avatar" 
            />
            <h3 className="fw-bold mb-1">Profil Pengguna</h3>
            <p className="text-muted mb-4">Informasi akun yang terdaftar</p>
            
            <div className="bg-light rounded p-3 text-start mb-3">
              <label className="small text-muted fw-bold">ID Pengguna</label>
              <div className="fw-medium">{user.id}</div>
            </div>
            
            <div className="bg-light rounded p-3 text-start mb-4">
              <label className="small text-muted fw-bold">Email</label>
              <div className="fw-medium">{user.email}</div>
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
