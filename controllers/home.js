const BlogPost = require('../models/blogpost');

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid');
    //console.log(req.session);
    res.render('index', {
        blogposts
    });
}