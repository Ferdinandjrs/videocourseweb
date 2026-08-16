import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-top pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row g-4">
          {/* Kolom Informasi Perusahaan */}
          <div className="col-12 col-lg-4">
            <h5 className="fw-bold text-warning mb-3">videobelajar</h5>
            <p className="fw-bold small mb-2 text-dark">Gali Potensi Anda Melalui Pembelajaran Video di harisenin.id!</p>
            <p className="text-muted small mb-1">Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
            <p className="text-muted small">+62-877-7123-1234</p>
          </div>

          {/* Kolom Kategori */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-dark mb-3">Kategori</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              <li style={{ cursor: 'pointer' }}>Digital & Teknologi</li>
              <li style={{ cursor: 'pointer' }}>Pemasaran</li>
              <li style={{ cursor: 'pointer' }}>Manajemen Bisnis</li>
              <li style={{ cursor: 'pointer' }}>Pengembangan Diri</li>
              <li style={{ cursor: 'pointer' }}>Desain</li>
            </ul>
          </div>

          {/* Kolom Perusahaan */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6 className="fw-bold text-dark mb-3">Perusahaan</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              <li style={{ cursor: 'pointer' }}>Tentang Kami</li>
              <li style={{ cursor: 'pointer' }}>FAQ</li>
              <li style={{ cursor: 'pointer' }}>Kebijakan Privasi</li>
              <li style={{ cursor: 'pointer' }}>Ketentuan Layanan</li>
              <li style={{ cursor: 'pointer' }}>Bantuan</li>
            </ul>
          </div>

          {/* Kolom Komunitas */}
          <div className="col-12 col-md-4 col-lg-2">
            <h6 className="fw-bold text-dark mb-3">Komunitas</h6>
            <ul className="list-unstyled small text-muted lh-lg">
              <li style={{ cursor: 'pointer' }}>Tips Sukses</li>
              <li style={{ cursor: 'pointer' }}>Blog</li>
            </ul>
          </div>
        </div>

        <hr className="my-4 text-black-50" />

        {/* Hak Cipta dan Sosial Media */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="small text-muted mb-0">@2023 Gerobak Sayur All Rights Reserved.</p>
          <div className="d-flex gap-3 small text-muted">
            <a href="#" className="text-decoration-none text-muted">LinkedIn</a>
            <a href="#" className="text-decoration-none text-muted">Facebook</a>
            <a href="#" className="text-decoration-none text-muted">Instagram</a>
            <a href="#" className="text-decoration-none text-muted">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;