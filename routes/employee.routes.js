// employee routes
const express = require("express");
const protectRoute = require("../middlewares/protectRoutes");
const {createEmp, editEmp} = require("../controllers/employee.controller");

const router = express.Router();

router.post('/createEmp', protectRoute, createEmp);
router.put('/editEmp', protectRoute, editEmp);
// router.get('searchEmp', searchEmp); 

module.exports = router;  