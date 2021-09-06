const express = require("express");
const app = express();
const connection = require("./database/connection");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso!");
    }).catch((error)=>{
        console.log(error);
    });

/******************Routes******************/
app.get("/",(req,res)=>{
    res.render("index");
});
app.use("/categorias", categoriesController);
app.use("/articles", articlesController);



app.listen(8080, ()=>{
    console.log("O servidor está rodando!");
});