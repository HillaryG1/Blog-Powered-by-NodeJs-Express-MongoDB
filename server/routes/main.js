const express = require('express');
const router = express.Router();


//Routes
router.get('',(req, res) => {
  const locals = {
    title: "NodeJs Blog",
    description: "Simple Blog created with NodeJs, Express & MongoDB."
  }

  res.render('index', { locals }); //rendering home page
});   

router.get('/about',(req, res) => {
  res.render('about'); 
}); 

router.get('/contact',(req, res) => {
  res.render('contact'); 
}); 



module.exports = router;