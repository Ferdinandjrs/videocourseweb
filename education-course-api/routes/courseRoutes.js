const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/course', authMiddleware.verifyToken, courseController.getAllCourses);
router.get('/course/:id', authMiddleware.verifyToken, courseController.getCourseById);
router.post('/course', authMiddleware.verifyToken, courseController.addCourse);
router.patch('/course/:id', authMiddleware.verifyToken, courseController.updateCourse);
router.put('/course/:id', authMiddleware.verifyToken, courseController.updateCourse);
router.delete('/course/:id', authMiddleware.verifyToken, courseController.deleteCourse);

module.exports = router;
