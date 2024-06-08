module.exports = (req, res) => {
    if (req.session.userId) {
        return res.render("create", {
            createPost: true
        });
    }
    res.redirect('/auth/login')
}

// module.exports = (req, res) => {
//     if (req.session.userId) {
//         return res.render("create");
//     }
//     res.redirect('/auth/login')
// }