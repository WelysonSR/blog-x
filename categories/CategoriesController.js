const express = require('express');
const router = express.Router();

//Routes GET
router.get("/", (req, res) =>{
    res.send("Rota de categoria");
});

router.get("/new", (req, res) =>{
    res.send("Rota para criar uma nova categoria");
});

//Routes POST

module.exports = router;