const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/TestimonialController');
const auth = require('../middleware/auth');

router.get('/', testimonialController.getAllActive);
router.post('/', auth, testimonialController.create);

module.exports = router;
