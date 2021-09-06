const express = require('express');
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

//Routes GET
router.get("/admin/categories/new", (req, res) =>{
    res.render("admin/categories/new");
});

//Routes POST
router.post("/categories/save", (req, res) =>{
    let title = req.body.title;
    if(title != undefined && title != ''){

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        });

    }else{
        res.redirect("/admin/categories/new");
    }
});

module.exports = router;