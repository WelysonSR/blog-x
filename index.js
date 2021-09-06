const express = require("express");
const app = express();
const connection = require("./database/connection");
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");

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
app.use("/", categoriesController);
app.use("/", articlesController);



app.listen(8080, ()=>{
    console.log("O servidor está rodando!");
});