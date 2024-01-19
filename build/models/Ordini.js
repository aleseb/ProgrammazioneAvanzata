"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Alimenti_1 = __importDefault(require("./Alimenti"));
class Ordine extends sequelize_1.Model {
}
Ordine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    stato: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'CREATO',
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    tableName: 'Ordini',
    sequelize: database_1.default,
});
Ordine.hasMany(Alimenti_1.default, { foreignKey: 'ordine_id', as: 'alimenti' });
exports.default = Ordine;
/*
Ordine.sync().then((data) => {
    console.log("tabella e modello sincronizzati");
  
  }).catch ((err) => {
    console.log("errore di sincronizzazione");
  
  });
  */ 
