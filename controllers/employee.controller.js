const mongoose = require("mongoose");
const Employee = require("../models/employee.model.js");

const checkNum = (mob) => {
    mob = parseInt(mob);
    if(!(/^\d+$/.test(mob) && Number.isInteger(parseInt(mob)))) return true;
    mob = parseInt(mob);
    let l = 0;
    while(mob > 0) {
        mob = Math.floor(mob / 10);
        l += 1;
    }
    if(l == 10) return false;
    return true;
}

const createEmp = async (req, res) => {
    try {
        const {name, email, mobile, designation, gender, course, img} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)) {
            return res.status(400).json("Invalid Email!!!");
        }

        if(await Employee.findOne({ email })) {
            return res.status(400).json("Duplicate email!!!");
        }

        if(checkNum(mobile)) {
            return res.status(400).json("Invalid phone number!!!");
        }

        if (!img.endsWith('.jpg') && !img.endsWith('.png')) {
            return res.status(400).json("Only .jpg and .png are allowed!!!");
        }

        // create employee
        const newEmp = new Employee({
            name: name,
            email: email,
            mobile: mobile,
            designation: designation,
            gender: gender,
            course: course,
            img: img
        });

        if(newEmp) {
            await newEmp.save();

            res.status(201).json({
                _id: newEmp.id,
                email: newEmp.email,
                name: newEmp.name
            });
        }

    } catch (error) {
        console.log(`Internal Server Error!!! ${error.message}`);
        res.status(500).json("Error!!! Internal Server");
    }
}


const editEmp = async (req, res) => {
    try {
        const {name, email, mobile, designation, gender, course, img} = req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email) || email == null) {
            return res.status(400).json("Invalid Email!!!");
        }

        if(mobile != null && checkNum(mobile)) {
            return res.status(400).json("Invalid phone number!!!");
        }

        if (img != null && !img.endsWith('.jpg') && !img.endsWith('.png')) {
            return res.status(400).json("Only .jpg and .png are allowed!!!");
        }

        const emp = await Employee.findOne({email: email});
        if(!emp) {
            return res.status(400).json("Employee not found");
        }

        if(name != null) emp.name = name;
        if(mobile != null) emp.mobile = mobile;
        if(designation != null) emp.designation = designation;
        if(gender != null) emp.gender = gender;
        if(course != null) emp.course = course;
        if(img != null) emp.img = img;
        
        await emp.save();

        res.status(201).json("employee details updated successfully.");
        
    } catch (error) {
        console.log(`Internal server error ${error.message}`);
        res.status(500).json("Internal Server Error");
    }
}


module.exports = {createEmp, editEmp};