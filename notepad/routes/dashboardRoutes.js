const express = require('express');
const router = express.Router();

// Import the controller for the dashboard
const dashboardController = require('../controllers/dashboardController');

// Define a route to render the dashboard view
router.get('/', dashboardController.renderDashboard);

module.exports = router;
