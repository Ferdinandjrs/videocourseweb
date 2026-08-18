import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Header = ({ setView, onSearch }) => {
  const [showCategory, setShowCategory] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setView('login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm px-3" style={{ zIndex: 1020 }}>
        <div className="container d-flex align-items-center justify-content-between">
          
          {/* Logo */}
          <span 
            className="navbar-brand fw-bold fs-4 m-0" 
            style={{ cursor: 'pointer', color: '#ff6600' }} 
            onClick={() => user ? setView('beranda') : setView('login')}
          >
            videobelajar
          </span>

          {/* Search Bar (Tengah) */}
          <div className="d-none d-md-flex mx-auto" style={{ width: '40%' }}>
            <input 
              type="text" 
              className="form-control px-4" 
              placeholder="Cari kelas berdasarkan judul..."
              onChange={(e) => onSearch && onSearch(e.target.value)}
              style={{ borderRadius: '25px', backgroundColor: '#f3f4f6', border: '1px solid #e5e7eb' }}
            />
          </div>

          {/* Kanan: Kategori & Profil */}
          <div className="d-flex align-items-center position-relative">
            
            {/* Kategori Dropdown */}
            <div 
              className="me-4 position-relative" 
            >
              <span 
                className="small fw-bold text-secondary" 
                style={{ cursor: 'pointer' }}
                onClick={() => setShowCategory(!showCategory)}
              >
                Kategori ▾
              </span>
              {showCategory && (
                <div className="position-absolute bg-white shadow-lg rounded-3 p-2 mt-2 border" style={{ top: '100%', left: '-20px', width: '180px', zIndex: 1000 }}>
                  <div className="p-2 dropdown-item rounded" style={{cursor: 'pointer'}} onClick={() => setShowCategory(false)}>Pemasaran</div>
                  <div className="p-2 dropdown-item rounded" style={{cursor: 'pointer'}} onClick={() => setShowCategory(false)}>Desain</div>
                  <div className="p-2 dropdown-item rounded" style={{cursor: 'pointer'}} onClick={() => setShowCategory(false)}>Pengembangan Diri</div>
                  <div className="p-2 dropdown-item rounded" style={{cursor: 'pointer'}} onClick={() => setShowCategory(false)}>Bisnis</div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div 
              className="position-relative"
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${user ? user.email : 'Guest'}&background=ffcc00`} 
                className="rounded-circle shadow-sm" 
                width="40" 
                alt="Profile" 
                style={{ cursor: 'pointer', border: '2px solid white' }}
                onClick={() => setShowProfile(!showProfile)}
              />
              {showProfile && (
                <div className="position-absolute bg-white shadow-lg rounded-3 p-2 mt-2 border" style={{ top: '100%', right: '0', width: '160px', zIndex: 1000 }}>
                  <div className="p-2 dropdown-item rounded fw-bold border-bottom mb-1 text-truncate">
                    {user ? user.email : 'Tamu'}
                  </div>
                  <div className="p-2 dropdown-item rounded" style={{cursor: 'pointer'}} onClick={() => { user ? setView('profile') : setView('login'); setShowProfile(false); }}>
                    Profil Saya
                  </div>
                  {user ? (
                    <div className="p-2 dropdown-item rounded text-danger" style={{cursor: 'pointer'}} onClick={() => { handleLogout(); setShowProfile(false); }}>Keluar</div>
                  ) : (
                    <div className="p-2 dropdown-item rounded text-success" style={{cursor: 'pointer'}} onClick={() => { setView('login'); setShowProfile(false); }}>Masuk</div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <div className="container">
        <div 
          className="my-4 p-5 text-white rounded-4 text-center shadow" 
          style={{ 
            background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070")',
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
          }}
        >
          <div className="col-lg-8 mx-auto py-4">
            <h1 className="fw-bold mb-3 fs-2 fs-md-1">
              Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
            </h1>
            <p className="lead small mb-4 opacity-75">
              Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
            </p>
            <button 
              className="btn fw-bold px-4 py-3 rounded-3 shadow" 
              style={{ backgroundColor: '#ff6600', color: '#fff', border: 'none', transition: '0.3s' }}
              onMouseOver={(e) => { e.target.style.transform = 'scale(1.05)'; e.target.style.backgroundColor = '#e65c00'; }}
              onMouseOut={(e) => { e.target.style.transform = 'scale(1)'; e.target.style.backgroundColor = '#ff6600'; }}
            >
              Temukan Video Course untuk Dipelajari!
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;