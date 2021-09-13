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

router.get("/admin/users/login",(req,res)=>{
    res.render("admin/users/login");
});

router.get("/admin/users/logout",(req,res)=>{
    req.session.user = undefined;
    res.redirect("/");
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

router.post("/admin/users/login",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email: email}}).then(user =>{
        if(user != undefined){
            let correct = bcrypt.compareSync(password, user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect("/admin/categories");
            }else{
                res.redirect("/admin/users/login");
            }
        }else{
            res.redirect("/admin/users/login");
        }
    });
});


module.exports = router;