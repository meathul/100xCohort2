const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } =require("../db");
const router = Router();

// Admin Routes
router.post('/signup',async (req, res) => {
    // Implement admin signup logic
    const username= req.body.username;
    const password= req.body.password;

    console.log('Request body:', req.body);
    console.log('Username:', username);
    console.log('Password:', password);

    try {
        const admin = await Admin.create({
            username: username,
            password: password
        });
        console.log('Created admin:', admin);
        res.json({
            msg:"Admin created Succesfully"
        });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({
            msg: "Error creating admin"
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description= req.body.description;
    const imageLink = req.body.imageLink;
    const price= req.body.price;
    const newCourse= await Course.create({
        title : title,
        description : description,
        imageLink : imageLink,
        price : price
    })
    console.log(newCourse);
    res.json({
        msg:"Course Created Succesfully" , courseid : newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    console.log(allCourses);
    res.json({
        courses : response
    })
});

module.exports = router;