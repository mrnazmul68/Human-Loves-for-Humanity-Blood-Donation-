const express = require('express');
const { getUser, updateUser, getDonors, getStats } = require('../controllers/userController');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.get('/donors', getDonors);
router.get('/stats', getStats);
router.get('/:id', getUser);
router.put('/:id', upload.single('profilePicture'), updateUser);

module.exports = router;
