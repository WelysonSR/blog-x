const Sequelize = require("sequelize");

const connection = new Sequelize('blog_x','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports =connection;