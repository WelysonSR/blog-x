const express = require('express');
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

//Routes GET
router.get("/admin/categories", (req, res) =>{
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {categories: categories});
    });    
});

router.get("/admin/categories/new", (req, res) =>{
    res.render("admin/categories/new");
});

router.get("/categories/delete/:id", (req, res) =>{
    let id = req.params.id
    //let id = req.body.id;

    if(id != undefined && !isNaN(id)){
        Category.destroy({
            where:{
                id:id
            }
        }).then(() => {
            res.redirect("/admin/categories");
        });
    }else{
        res.redirect("/admin/categories");
    }
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