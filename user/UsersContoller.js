const express = require('express');
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

//Rotas Get
router.get("/admin/users",(req,res)=>{
    User.findAll().then(users =>{
        res.render("admin/users/index",{users: users});
    });
});

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/create");
});

//Rotas Post
router.post("/users/create", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);

            User.create({
                name: name,
                email: email,
                password: hash
            }).then(() => {
                res.redirect("/admin/users/create");
            }).catch(err => {
                res.redirect("/admin/users/create");
            });
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;