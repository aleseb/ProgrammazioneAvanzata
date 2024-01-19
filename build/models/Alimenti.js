"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.someFunction = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
console.log('ciao');
class Alimento extends sequelize_1.Model {
}
Alimento.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    quantita: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    quantita_disponibile: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
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
    quantita_caricata: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Alimenti',
    sequelize: database_1.default,
});
exports.default = Alimento;
// Alimenti.ts
const someFunction = () => {
    // Contenuto del modulo
};
exports.someFunction = someFunction;
/*
Alimento.sync().then((data) => {
    console.log("tabella e modello sincronizzati");
  
  }).catch ((err) => {
    console.log("errore di sincronizzazione");
  
  });
  */ 
