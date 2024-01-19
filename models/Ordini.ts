import { DataTypes, Model, HasManyGetAssociationsMixin} from 'sequelize';
import Database from '../config/database';
import Alimento from './Alimenti';
const databaseInstance = Database.getInstance();
const sequelize = databaseInstance.getSequelize();

class Ordine extends Model {
  public id!: number;
  public stato!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public getAlimenti!: HasManyGetAssociationsMixin<Alimento>;
}

Ordine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    stato: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'CREATO',
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
  },
  {
    tableName: 'Ordini',
    sequelize,
  }
);

Ordine.hasMany(Alimento, { foreignKey: 'ordine_id', as: 'alimenti' });

export default Ordine;
/*
Ordine.sync().then((data) => { 
    console.log("tabella e modello sincronizzati");
  
  }).catch ((err) => {
    console.log("errore di sincronizzazione");
  
  });
  */