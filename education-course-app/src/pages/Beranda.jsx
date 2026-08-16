import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../services/api/coursesApi';
import { setCourses } from '../store/redux/coursesSlice';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import Financial_Analyst from "../assets/Financial_Analyst.png"
import Financial_Analyst_1 from "../assets/Financial_Analyst_1.png"
import Financial_Analyst_2 from "../assets/Financial_Analyst_2.png"
import Financial_Analyst_3 from "../assets/Financial_Analyst_3.png"
import Financial_Analyst_4 from "../assets/Financial_Analyst_4.png"
import Financial_Analyst_5 from "../assets/Financial_Analyst_5.png"
import Financial_Analyst_6 from "../assets/Financial_Analyst_6.png"
import Financial_Analyst_7 from "../assets/Financial_Analyst_7.png"
import Avatar_1 from "../assets/Avatar_1.png"
import Avatar_2 from "../assets/Avatar_2.png"
import Avatar_3 from "../assets/Avatar_3.png"
import Avatar_4 from "../assets/Avatar_4.png"
import Avatar_5 from "../assets/Avatar_5.png"
import Avatar_6 from "../assets/Avatar_6.png"
import Avatar_7 from "../assets/Avatar_7.png"

import Footer from '../components/Footer';
const initialCoursesData = [
    {
      image: Financial_Analyst, 
      title: "Big 4 Auditor Financial Analyst",
      description: "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_1,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_1, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_2,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_2, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_3,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_3, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_4,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_4, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_5,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_5, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_6,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_6, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_7,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    },
    {
      image: Financial_Analyst_7, 
      title: "Financial Accounting Reporting",
      description: "Pelajari dasar pelaporan keuangan dengan standar internasional terbaik...",
      instructorName: "Jenna Ortega",
      instructorRole: "Senior Accountant di Gojek",
      instructorAvatar: Avatar_2,
      rating: 4,
      reviews: 86,
      price: "Rp 300K"
    }
  ];

const Beranda = ({ setView }) => {
  const courses = useSelector((state) => state.courses.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Semua Kelas");
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    instructorName: "",
    instructorRole: "",
    category: "Pemasaran",
    image: "",
    instructorAvatar: Avatar_1,
    rating: 5,
    reviews: 0
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      dispatch(setCourses(data));
    } catch (error) {
      console.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = {
        ...formData,
        image: formData.image && formData.image.trim() !== "" ? formData.image : Financial_Analyst,
      };

      if (editingId !== null) {
        await updateCourse(editingId, submitData);
      } else {
        await addCourse(submitData);
      }
      await fetchCourses();
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        price: "",
        instructorName: "",
        instructorRole: "",
        category: "Pemasaran",
        image: "",
        instructorAvatar: Avatar_1,
        rating: 5,
        reviews: 0
      });
    } catch (error) {
      console.error("Failed to submit form");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    const isDefaultImage = course.image === Financial_Analyst;
    setFormData({
      ...course,
      image: isDefaultImage ? "" : course.image
    });
    setEditingId(course.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah anda yakin ingin menghapus course ini?")) {
      setLoading(true);
      try {
        await deleteCourse(id);
        await fetchCourses();
      } catch (error) {
        console.error("Failed to delete course");
      } finally {
        setLoading(false);
      }
    }
  };

  let filteredCourses = activeCategory === "Semua Kelas" 
    ? courses 
    : courses.filter(course => course?.category === activeCategory);

  if (searchQuery.trim() !== "") {
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <div style={{ backgroundColor: '#fffaf0', minHeight: '100vh' }}>
      <Header setView={setView} onSearch={setSearchQuery} />

      <div className="container">
        <main className="py-4">
          <h4 className="fw-bold mb-1">Koleksi Video Pembelajaran Unggulan</h4>
          <p className="text-muted small mb-4">Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!</p>

          
          <div className="d-flex gap-3 mb-4 overflow-x-auto pb-2" style={{ whiteSpace: 'nowrap' }}>
            {["Semua Kelas", "Pemasaran", "Desain", "Pengembangan Diri", "Bisnis"].map(cat => (
              <span 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? "text-danger fw-bold border-bottom border-2 border-danger pb-1" : "text-muted"} 
                style={{ cursor: 'pointer' }}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="card mb-4 border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3">{editingId !== null ? 'Update Course' : 'Tambah Course Baru'}</h5>
            <form onSubmit={handleFormSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleInputChange} placeholder="Judul Course" required />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" name="price" value={formData.price} onChange={handleInputChange} placeholder="Harga (Contoh: Rp 300K)" required />
                </div>
                <div className="col-md-4">
                  <select className="form-select" name="category" value={formData.category} onChange={handleInputChange} required>
                    <option value="Pemasaran">Pemasaran</option>
                    <option value="Desain">Desain</option>
                    <option value="Pengembangan Diri">Pengembangan Diri</option>
                    <option value="Bisnis">Bisnis</option>
                  </select>
                </div>
                <div className="col-md-12">
                  <input type="text" className="form-control" name="image" value={formData.image} onChange={handleInputChange} placeholder="URL Gambar (Opsional, kosongkan untuk gambar default)" />
                </div>
                <div className="col-md-12">
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} placeholder="Deskripsi Singkat" required></textarea>
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" name="instructorName" value={formData.instructorName} onChange={handleInputChange} placeholder="Nama Instruktur" required />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control" name="instructorRole" value={formData.instructorRole} onChange={handleInputChange} placeholder="Peran Instruktur (Contoh: Senior Accountant di Gojek)" required />
                </div>
                <div className="col-12 text-end">
                  {editingId !== null && (
                    <button type="button" className="btn btn-secondary me-2" onClick={() => {
                      setEditingId(null);
                      setFormData({ title: "", description: "", price: "", instructorName: "", instructorRole: "", category: "Pemasaran", image: "", instructorAvatar: Avatar_1, rating: 5, reviews: 0 });
                    }}>Batal</button>
                  )}
                  <button type="submit" className="btn btn-primary">{editingId !== null ? 'Simpan Perubahan' : 'Tambah Course'}</button>
                </div>
              </div>
            </form>
          </div>

          {loading ? (
            <div className="row g-4">
              {[1, 2, 3].map((n) => (
                <div key={n} className="col-12 col-md-6 col-lg-4">
                  <div className="card h-100 border-light-subtle rounded-3 shadow-sm">
                    <div className="skeleton-box" style={{ height: '180px' }}></div>
                    <div className="card-body p-3">
                      <div className="skeleton-box mb-2" style={{ height: '20px', width: '80%' }}></div>
                      <div className="skeleton-box mb-3" style={{ height: '15px', width: '100%' }}></div>
                      <div className="skeleton-box mb-3" style={{ height: '15px', width: '90%' }}></div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="skeleton-box rounded-2 me-2" style={{ width: '35px', height: '35px' }}></div>
                        <div className="skeleton-box" style={{ height: '35px', width: '60%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row g-4">
              {filteredCourses.length === 0 ? (
                <div className="col-12 text-center text-muted my-5">Belum ada course di kategori ini. Silakan tambahkan!</div>
              ) : (
                filteredCourses.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    {...course} 
                    onEdit={() => handleEdit(course)}
                    onDelete={() => handleDelete(course.id)}
                  />
                ))
              )}
            </div>
          )}

         
          <section className="my-5 p-5 text-white text-center rounded-3" style={{ 
            background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070")',
            backgroundSize: 'cover'
          }}>
            <h4 className="fw-bold mb-2">Mau Belajar Lebih Banyak?</h4>
            <p className="small text-white-50 mb-4">Daftarkan dirimu untuk mendapatkan informasi terbaru.</p>
            <div className="mx-auto input-group" style={{ maxWidth: '450px' }}>
              <input type="email" className="form-control" placeholder="Masukkan Emailmu" />
              <button className="btn btn-warning fw-bold" type="button">Subscribe</button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Beranda;