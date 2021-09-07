const Sequelize = require("sequelize");

const connection = new Sequelize('blog_x','root','root',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports =connection;