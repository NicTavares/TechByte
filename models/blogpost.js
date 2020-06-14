const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: String,
    body: String, 
    username: String,
    datePosted: {
        type: Date, 
        default: new Date()
    },
    image: String
});

const blogPost = mongoose.model('blogPost', blogPostSchema);

module.exports = blogPost;