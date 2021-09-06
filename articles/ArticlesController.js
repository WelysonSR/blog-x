const express = require('express');
const router = express.Router();

//Routes GET
router.get("/articles", (req, res) =>{
    res.send("Rota de artigos");
});

router.get("/adm", (req, res) =>{
    res.send("Rota adiministrativo");
});

//Routes POST

module.exports = router;