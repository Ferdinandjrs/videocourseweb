const db = require('../config/database');

const getAllCourses = async (queryParams = {}) => {
  let sql = 'SELECT * FROM courses';
  const values = [];
  const conditions = [];

  // Filter by category_id
  if (queryParams.category_id) {
    conditions.push('category_id = ?');
    values.push(queryParams.category_id);
  }

  // Search by title using LIKE
  if (queryParams.search) {
    conditions.push('title LIKE ?');
    values.push(`%${queryParams.search}%`);
  }

  // Gabungkan semua kondisi WHERE
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Sort (ORDER BY)
  if (queryParams.sortBy) {
    const allowedFields = ['title', 'price', 'id'];
    const field = allowedFields.includes(queryParams.sortBy) ? queryParams.sortBy : 'id';
    const order = queryParams.order === 'DESC' ? 'DESC' : 'ASC';
    sql += ` ORDER BY ${field} ${order}`;
  }

  const [rows] = await db.query(sql, values);
  return rows;
};

const getCourseById = async (id) => {
  const [rows] = await db.query('SELECT * FROM courses WHERE id = ?', [id]);
  return rows[0];
};

const addCourse = async (courseData) => {
  const { title, price, category_id, tutor_id } = courseData;
  const [result] = await db.query(
    'INSERT INTO courses (title, price, category_id, tutor_id) VALUES (?, ?, ?, ?)',
    [title, price, category_id, tutor_id]
  );
  return result.insertId;
};

const updateCourse = async (id, courseData) => {
  const { title, price, category_id, tutor_id } = courseData;
  const [result] = await db.query(
    'UPDATE courses SET title = ?, price = ?, category_id = ?, tutor_id = ? WHERE id = ?',
    [title, price, category_id, tutor_id, id]
  );
  return result.affectedRows;
};

const deleteCourse = async (id) => {
  const [result] = await db.query('DELETE FROM courses WHERE id = ?', [id]);
  return result.affectedRows;
};

module.exports = {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse
};
