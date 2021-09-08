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
    Article.findAll({
        order:[
            ['id','DESC']
        ]
    }).then(articles => {
        res.render("index",{articles: articles});
    });
});
app.get("/:slug",(req, res)=>{
    let slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article =>{
        if(article != undefined){
            res.render("article",{article: article});
        }else{
            res.render("/");
        }
    }).catch(erro => {
        res.render("/");
    });
});
app.use("/", categoriesController);
app.use("/", articlesController);



app.listen(8080, ()=>{
    console.log("O servidor está rodando!");
});