import { DataTypes, Model } from 'sequelize';
import Database from '../config/database';
//import Operazione from './Operazioni';

const databaseInstance = Database.getInstance();
const sequelize = databaseInstance.getSequelize();

class Alimento extends Model {
  public id!: number;
  public nome!: string;
  public quantita!: number;
  public quantita_disponibile!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public quantita_caricata!: number;
  //public operazioni!: Operazione[];
}

Alimento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantita: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantita_disponibile: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    quantita_caricata: { 
      type: DataTypes.INTEGER,
      allowNull: true, 
    },
  },
  {
    tableName: 'Alimenti',
    sequelize,
  }
);

//Alimento.hasMany(Operazione, { foreignKey: 'alimento_id', as: 'operazioni' });
export default Alimento;
// Alimenti.ts

export const someFunction = () => {
    // Contenuto del modulo
  };
  
/*
Alimento.sync().then((data) => { 
    console.log("tabella e modello sincronizzati");
  
  }).catch ((err) => {
    console.log("errore di sincronizzazione");
  
  });
  */