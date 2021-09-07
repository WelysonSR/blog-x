const express = require('express');
const router = express.Router();

//Routes GET
router.get("/articles", (req, res) =>{
    res.send("Rota de artigos");
});

router.get("/admin/articles/new", (req, res) =>{
    res.render("admin/articles/new");
});

//Routes POST

module.exports = router;