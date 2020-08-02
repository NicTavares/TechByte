module.exports = (req, res, next) => {

    if(req == null) {
        console.log('Files is null');
        return res.redirect('/posts/new');
    } else if(req.body.title == null) {
        console.log('req.body.title == null');
        return res.redirect('/posts/new');
    } else if(req.body.body == null) {
        console.log('req.body.body == null');
        return res.redirect('/posts/new');
    }
    next();
}