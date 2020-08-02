const path = require('path');
const BlogPost = require('../models/blogpost')

module.exports = (req, res) => {
    console.log(req.body);
    const comment = {
        body: req.body.body
    }
    BlogPost.findByIdAndUpdate(req.body.postid,
        {$push: {comments: comment}},
        function(err, doc) {
            if(err){
                console.log(err)
            } else {
                console.log("Successful update!")
            }
        }
    );
    
    
    res.redirect(req.get('referer'));
}