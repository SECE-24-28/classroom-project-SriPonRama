const express = require('express');
const { getPlans, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getPlans);
router.post('/', adminAuth, createPlan);
router.put('/:id', adminAuth, updatePlan);
router.delete('/:id', adminAuth, deletePlan);

module.exports = router;