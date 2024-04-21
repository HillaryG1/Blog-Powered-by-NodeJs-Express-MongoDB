const express = require('express');
const router = express.Router();
const Post = require('../models/Post');





//Pagination
router.get('', async (req, res) => {
try {
    const locals = {
      title: "NodeJs Blog",
      description: "Blog powered by NodeJs, Express & MongoDB."
    }

    let perPage = 10; //how many it displays at a time
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: {createdAt: -1} }])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();
  
    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count/perPage);

  res.render('index', { 
    locals, 
    data,
    current: page,
    nextPage: hasNextPage ? nextPage : null
  }); 

} catch (error) {
  console.log(error);
}

});   




















//GET Post :id
router.get('/post/:id', async (req, res) => {
  try {

    const locals = {
      title: "NodeJs Blog",
      description: "Blog powered by NodeJs, Express & MongoDB."
    }

    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
res.render('post', { locals, data});
} catch (error) {
  console.log(error);
}

});




router.get('/about',(req, res) => {
  res.render('about'); 
}); 

router.get('/contact',(req, res) => {
  res.render('contact'); 
}); 






module.exports = router;