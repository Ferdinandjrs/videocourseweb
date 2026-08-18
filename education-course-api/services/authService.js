const db = require('../config/database');

const getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const getUserByToken = async (token) => {
  const [rows] = await db.query('SELECT * FROM users WHERE verification_token = ?', [token]);
  return rows[0];
};

const createUser = async (userData) => {
  const { fullname, username, email, password, verification_token } = userData;
  const [result] = await db.query(
    'INSERT INTO users (name, username, email, password, verification_token, is_verified) VALUES (?, ?, ?, ?, ?, false)',
    [fullname, username, email, password, verification_token]
  );
  return result.insertId;
};

const verifyUserEmail = async (userId) => {
  const [result] = await db.query(
    'UPDATE users SET is_verified = true, verification_token = NULL WHERE id = ?',
    [userId]
  );
  return result.affectedRows;
};

const getUserById = async (id) => {
  const [rows] = await db.query('SELECT id, name as fullname, username, email, phone, avatar FROM users WHERE id = ?', [id]);
  return rows[0];
};

const updateUserProfile = async (id, data) => {
  const { fullname, phone, avatar } = data;
  let query = 'UPDATE users SET name = ?, phone = ?';
  const params = [fullname, phone];

  if (avatar !== undefined) {
    query += ', avatar = ?';
    params.push(avatar);
  }
  query += ' WHERE id = ?';
  params.push(id);

  const [result] = await db.query(query, params);
  return result.affectedRows;
};

module.exports = {
  getUserByEmail,
  getUserByToken,
  createUser,
  verifyUserEmail,
  getUserById,
  updateUserProfile
};
