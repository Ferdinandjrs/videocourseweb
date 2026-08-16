const nodemailer = require('nodemailer');

const sendVerificationEmail = async (toEmail, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const verificationUrl = `http://localhost:5000/verify-email?token=${token}`;

  const info = await transporter.sendMail({
    from: '"EduCourse App" <no-reply@educourse.com>',
    to: toEmail,
    subject: 'Verifikasi Akun EduCourse',
    text: `Halo, klik link ini untuk memverifikasi akun Anda: ${verificationUrl}`,
    html: `<p>Halo, klik link ini untuk memverifikasi akun Anda: <br><a href="${verificationUrl}">${verificationUrl}</a></p>`
  });

  console.log("Email terkirim! URL Preview (jika menggunakan Ethereal): %s", nodemailer.getTestMessageUrl(info));
};

module.exports = {
  sendVerificationEmail
};
