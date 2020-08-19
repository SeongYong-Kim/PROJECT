const Sequelize = require("sequelize");
const model = require("../model");

// const sequelize = new Sequelize("world", "root", "너의 비밀번호", {
//     host: "localhost",
//     dialect: "mysql",
//     define: {
//         freezeTableName: true,
//         timestamps: false,
//     },
// });
const sequelize = new Sequelize("dbtest", "root", "76071090za*", {
    host: "localhost",
    dialect: "mysql",
    define: {
        freezeTableName: true,
        timestamps: false,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
        })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
        });

const models = model(Sequelize, sequelize);

module.exports = {
    Sequelize,
    sequelize,
    models,
};

