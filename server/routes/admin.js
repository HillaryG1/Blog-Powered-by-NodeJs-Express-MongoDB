const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;





//Check Login
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if(!token) {
    return res.status(401).json( { message: 'Unauthorized' } );
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
  } catch(error) {
    res.status(401).json( { message: 'Unauthorized' } );
  }



}


//Get Admin - Login Page

router.get('/admin', async (req, res) => {
  try {
      const locals = {
        title: "Admin",
        description: "Blog powered by NodeJs, Express & MongoDB."
      }
  
      res.render('admin/index', { locals, layout: adminLayout });
    } catch (error) {
      console.log(error);
    }
  });




  //POST / Admin - Check Login
router.post('/admin', async (req, res) => {
  try {
  const { username, password} = req.body;
    
    const user = await User.findOne({ username })

    if(!user) {
      return res.status(401).json({ message: 'Invalid credentials'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials'});
    }
    



    const token = jwt.sign({ userId: user._id}, jwtSecret);
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/dashboard');

    } catch (error) {
      console.log(error);
    }
  });

   
  
  
  
  //GET / Admin - Dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {
try {
  const locals = {
    title: 'Dashboard',
    description: 'Blog powered by Nodejs, Express & MongoDB.'
  }

  const data = await Post.find();
  res.render('admin/dashboard', {
    locals,
    data 
  });

  
} catch (error) {

}







});

//POST / Admin - Register
router.post('/register', async (req, res) => {
  try {
    const { username, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await User.create({ username, password:hashedPassword });
      res.status(201).json({message: 'User Created', user});
    } catch (error) {
      if(error.code === 11000) {
        res.status(409).json({message: 'user already in use'});
      }
      res.status(500).json({ message: 'Internal server error'})
    }

    } catch (error) {
      console.log(error);


    }
  });

module.exports = router;
