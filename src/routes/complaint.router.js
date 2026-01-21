const { createComplaint,getAllComplaints,getUserComplaints,getMyComplaints } = require('../controllers/complaintController')
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const roleAccess = require('../middleware/roleAccess')
const router = express.Router()

router.post('/create-complaint',authMiddleware,roleAccess('user'), createComplaint)
router.get('/all-complaints',authMiddleware,roleAccess('admin'),getAllComplaints)
router.get('/my-complents',authMiddleware,roleAccess('user'),getMyComplaints)
router.get('/user-complaints/:id',authMiddleware,roleAccess('admin'),getUserComplaints)

module.exports = router