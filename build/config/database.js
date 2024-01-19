"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: '3306',
    username: 'root@localhost',
    password: 'AvanzataProgram2024?',
    database: 'prova',
});
exports.default = sequelize;
