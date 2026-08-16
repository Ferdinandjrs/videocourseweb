const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const authService = require('../services/authService');
const emailUtil = require('../utils/email');

const register = async (req, res) => {
  try {
    const { fullname, username, email, password } = req.body;
    
    const existingUser = await authService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email sudah terdaftar' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const token = uuidv4();

    await authService.createUser({
      fullname,
      username,
      email,
      password: hashedPassword,
      verification_token: token
    });

    // Kirim Email
    await emailUtil.sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Registrasi berhasil. Silakan cek email Anda untuk verifikasi.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    if (!user.is_verified) {
      return res.status(403).json({ message: 'Akun belum diverifikasi, cek email Anda' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query; 
    if (!token) return res.status(400).json({ message: 'Token tidak disediakan' });

    const user = await authService.getUserByToken(token);
    if (!user) {
      return res.status(400).json({ message: 'Invalid Verification Token' });
    }

    await authService.verifyUserEmail(user.id);
    res.json({ message: 'Email Verified Successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  verifyEmail
};
